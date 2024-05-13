import { Injectable, OnInit } from "@angular/core";
import {
	Firestore,
	collection,
	doc,
	getDocs,
	setDoc,
	query,
} from "@angular/fire/firestore";
import { Auth } from "@angular/fire/auth";
import { where } from "firebase/firestore";
import { User } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UsersMoviesService {
	private userDataSubject = new BehaviorSubject<User | null>(null);
	userData$ = this.userDataSubject.asObservable();

	uid: string;
	userData: any;

	constructor(private fs: Firestore, private auth: Auth) {}

	initUserData(): void {
		this.uid = this.auth.currentUser.uid;
		this.updateUserData();
	}

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
		this.userData$.subscribe((data) => {
			this.userData = data;
		});
		const userDocRef = doc(this.fs, "users", this.auth.currentUser.uid);
		if (typeOfList === "watched") {
			updatedUser = {
				email: this.userData.email,
				username: this.userData.username,
				watchlist: [...this.userData.watchlist],
				watched: [...this.userData.watched, movieId],
			};
		} else if (typeOfList === "watchlist") {
			updatedUser = {
				email: this.userData.email,
				username: this.userData.username,
				watchlist: [...this.userData.watchlist, movieId],
				watched: [...this.userData.watched],
			};
		}
		await setDoc(userDocRef, updatedUser);
		this.updateUserData();
	}

	async removeFromWatchedOrWatchlist(movieId: string, typeOfList: string) {
		let updatedUser;
		this.userData$.subscribe((data) => {
			this.userData = data;
		});
		const userDocRef = doc(this.fs, "users", this.auth.currentUser.uid);
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
        } else if (typeOfList === "watchlist") {
            let watchistArray = [];
			this.userData.watched.forEach((movie_id) => {
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

		await setDoc(userDocRef, updatedUser);
		this.updateUserData();
	}
}
