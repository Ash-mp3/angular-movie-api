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
}
