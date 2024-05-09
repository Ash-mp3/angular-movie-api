import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { movies } from './mock-movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    featuredMovies: any[] = movies.featured

  constructor() { }


  getMovies(){
    return of(this.featuredMovies)
  }

  getMovie(id: number){
    const selectedMovie = this.featuredMovies.find(movie => movie.id === id)
    return of(selectedMovie)
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

    let formattedMovieResponse = []

    //get the first 5 movies (which will be the ones with the highest match strength)
    //and push the full movie object to the formattedMovieResponse
    for(let i=0; i<6; i++){
      const movieId = uniqueMovies[i].id
      const fullMovie = this.featuredMovies.find(movie => movie.id === movieId)
      formattedMovieResponse.push(fullMovie)
    }

    return(of(formattedMovieResponse))

  }
}
