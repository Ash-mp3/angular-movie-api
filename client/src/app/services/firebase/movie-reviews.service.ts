import { Injectable } from '@angular/core';
import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  
  })

export class MovieReviewService {

    constructor(private fs: Firestore, private auth: Auth) {

    }

    movieReviews: any[] = [
        {
          id: 693134,
          reviews: [
            {
              user: 'Anderson',
              rating: 5,
              text: "wow, good movie!"
            },
            {
              user: 'Anderson1',
              rating: 4,
              text: "wow, good movie!!"
            },
            {
              user: 'Anderson2',
              rating: 3,
              text: "wow, good movie!!!"
            }
          ]
        }
      ]
      
      //first checks if the movie has had a comment before
	async checkIfMovieIsNewToDb(
		movieId: string,
		review: string,
		rating: number
	) {
		let isNew = true;
		const moviesCollection = collection(this.fs, "movies");
		const allMovies = await getDocs(moviesCollection);
		allMovies.docs.forEach((doc) => {
			if (doc.id === movieId) {
				isNew = false;
			}
		});
		//if the movie is new, add it to the db
		if (isNew) {
			this.addMovie(movieId, review, rating);
		} else if (!isNew) {
			this.addReview(movieId, review, rating);
		}
	}


  
	async getMovieReviews(movieId: string) {
		let movieData;
		const moveisCollection = collection(this.fs, "movies");
		const allMovies = await getDocs(moveisCollection);
		allMovies.docs.forEach((doc) => {
			if (doc.id === movieId) {
				movieData = doc.data();
			}
		});
		return of(movieData);
	}


	//adds the movie object to the db
	async addMovie(movieId: string, review: string, rating: number) {
		const movieCollection = collection(this.fs, "movies");
		const newMovie = {
			id: movieId,
			reviews: [],
		};
		const newMovieDoc = doc(movieCollection, movieId);
		await setDoc(newMovieDoc, newMovie).then((result) => {
			console.log(
				"new movie comment section created succesfully ",
				result
			);
		});
		//then adds the review to the object
		this.addReview(movieId, review, rating);
	}



	//addes the review to the movie object
	async addReview(movieId: string, review: string, rating: number) {
		let movieData;
		const movieDocRef = doc(this.fs, "movies", movieId);
		const getMovieQuery = query(
			collection(this.fs, "movies"),
			where("id", "==", movieId)
		);
		const docSnap = await getDocs(getMovieQuery);
		docSnap.forEach((doc) => {
			movieData = doc.data();
		});
		const splitEmail = this.auth.currentUser.email.split("@");
		const username = splitEmail[0];
		const newMovieObject = {
			id: movieId,
			reviews: [
				{
					review: review,
					rating: rating,
					user: username,
				},
				...movieData.reviews,
			],
		};
		await setDoc(movieDocRef, newMovieObject);
	}

}
