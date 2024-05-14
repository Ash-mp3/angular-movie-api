import { Injectable} from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { where } from "firebase/firestore";
import { User } from "../models/user";
import { BehaviorSubject } from "rxjs";
import {
	Firestore,
	collection,
	doc,
	getDocs,
	setDoc,
	query,
} from "@angular/fire/firestore";

@Injectable({
	providedIn: "root",
})
export class UsersMoviesService {
    //state variable that the user data is stored in
	private userDataSubject = new BehaviorSubject<User | null>(null);
	userData$ = this.userDataSubject.asObservable();

	uid: string;
	userData: any;

	constructor(private fs: Firestore, private auth: Auth) {}

	initUserData(): void {
		this.uid = this.auth.currentUser.uid;
		this.updateUserData();
	}

    //this is called after every database update so the client data matchs the database
	async updateUserData(): Promise<void> {
		const getUserQuery = query(
			collection(this.fs, "users"),
			where("email", "==", this.auth.currentUser.email)
		);
		const docSnap = await getDocs(getUserQuery);
		docSnap.forEach((doc) => {
			this.userData = doc.data() as User;
			const data = doc.data() as User;
			this.userDataSubject.next(data);
		});
	}

	async addToWatchedOrWatchlist(movieId: string, typeOfList: string) {
        let updatedUser;
        const userDocRef = doc(this.fs, "users", this.auth.currentUser.uid);

        //get current user data
		this.userData$.subscribe((data) => {
			this.userData = data;
		});
        
        //if the watched button was clicked then it gets added to the watched array
		if (typeOfList === "watched") {
			updatedUser = {
				email: this.userData.email,
				username: this.userData.username,
				watchlist: [...this.userData.watchlist],
				watched: [...this.userData.watched, movieId],
            };

        //if the watchlist button was clicked then it gets added to the watchlist array
		} else if (typeOfList === "watchlist") {
			updatedUser = {
				email: this.userData.email,
				username: this.userData.username,
				watchlist: [...this.userData.watchlist, movieId],
				watched: [...this.userData.watched],
			};
        }
        //updating the doc
		await setDoc(userDocRef, updatedUser);
		this.updateUserData();
	}

	async removeFromWatchedOrWatchlist(movieId: string, typeOfList: string) {
        let updatedUser;
        const userDocRef = doc(this.fs, "users", this.auth.currentUser.uid);

        //get current user data
		this.userData$.subscribe((data) => {
			this.userData = data;
        });
        //if the watched button was clicked agian, it loops through the users watched movies to find and remove the current movie.
		if (typeOfList === "watched") {
			let watchedArray = [];
			this.userData.watched.forEach((movie_id) => {
				if (movie_id !== movieId) {
					watchedArray.push(movie_id);
				}
			});
			updatedUser = {
				email: this.userData.email,
				username: this.userData.username,
				watchlist: [...this.userData.watchlist],
				watched: [...watchedArray],
            };
            
        //if the watchlist button was clicked agian, it loops through the users watchlist movies to find and remove the current movie.
        } else if (typeOfList === "watchlist") {
            let watchistArray = [];
			this.userData.watchlist.forEach((movie_id) => {
				if (movie_id !== movieId) {
					watchistArray.push(movie_id);
				}
			});
			updatedUser = {
				email: this.userData.email,
				username: this.userData.username,
				watchlist: [...watchistArray],
				watched: [...this.userData.watched],
			};
        }
        //updating the doc
		await setDoc(userDocRef, updatedUser);
		this.updateUserData();
	}
}
