import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  
  })

export class MovieReviewService {



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
      
      getMovieReviews(id: number){
        const selectedMovie = this.movieReviews.find(movie => movie.id === id)
    
        return of(selectedMovie)
      }

}
