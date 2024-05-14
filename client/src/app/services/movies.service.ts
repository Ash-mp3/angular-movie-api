import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { movies } from './mock-movies';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',

})

export class MoviesService {
  featuredMovies: any[] = movies.featured
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }


  getMovies(){
    return of(this.featuredMovies)
  }

  getMovie(id: number){
/*     const selectedMovie = this.featuredMovies.find(movie => movie.id === id)
    const similarMovies = this.getSimilarMovies(id)
    const result = {
      selectedMovie: selectedMovie,
      similarMovies: similarMovies,
      return of(result)
    } */


    const url = `${this.apiUrl}/api/getMovie?id=${id}`
    const result = this.http.get<any>(url)
    console.log(url)

    return result
  }



  //this function just returns the movies with most matching genre ids
  getSimilarMovies(id: number){
    //this logic will be moved to backend

    let similarMovies = []

    const selectedMovie = this.featuredMovies.find(movie => movie.id === id)
    const selectedMovieGenres = selectedMovie.genre_ids


    //loop through each movie and only include them if their genres = the selected movie genre
    this.featuredMovies.forEach(movie => {
      selectedMovieGenres.forEach((genre: any) => {
        if(
          movie.genre_ids.indexOf(genre) !== -1
          && movie.id !== id
        ){
          similarMovies.push(movie.id)
        }
      })
    });

    //get unique movies and put them in an object 
    //where we can associate their id with a matchStrength
    let uniqueMovies = [...new Set(similarMovies)]
    uniqueMovies.forEach((id, index) => {
      uniqueMovies[index] = {
        id: id,
        matchStrength: 0
      }
    })

    //give each movie a match strength
    uniqueMovies.forEach(movie => {
      let count = 0
      similarMovies.forEach(similarMovie => {
        if(similarMovie === movie.id){
          count++
        }
      })
      movie.matchStrength = count
    })


    //sort the movies based on match strength
    uniqueMovies.sort((a, b) => {
      return b.matchStrength - a.matchStrength;
    })


    //if the lenght of the unique movies is less than 6, push extra movies
    if(uniqueMovies.length < 6){
      this.featuredMovies.forEach((movie) => {
        if(uniqueMovies.length < 6){
          let duplicate = false
          uniqueMovies.forEach(matchingMovie => {
            if(matchingMovie.id === movie.id){
              duplicate = true
            }
          })
          if(!duplicate){
            uniqueMovies.push({
              id: movie.id,
              matchStrength: 0
            })
          }
        }
      })
    }



    //get the first 6 movies (which will be the ones with the highest match strength)
    //and push the full movie object to the formattedMovieResponse

    let formattedMovieResponse = []

    for(let i=0; i<6; i++){
      const movieId = uniqueMovies[i].id
      const fullMovie = this.featuredMovies.find(movie => movie.id === movieId)
      formattedMovieResponse.push(fullMovie)
    }

    return(formattedMovieResponse)
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
  
  getMovieReviews(id: number){
    const selectedMovie = this.movieReviews.find(movie => movie.id === id)

    return of(selectedMovie)
  }

}