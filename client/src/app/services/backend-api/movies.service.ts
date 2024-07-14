import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',

})

export class MoviesService {
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }


  getMovies() {
    const url = `${this.apiUrl}/api/getMovies`
    const result = this.http.get<any>(url)
    return result
  }

  getMovie(id: number, includeSimilarMovies: boolean) {
    const url = `${this.apiUrl}/api/getMovie?id=${id}&includeSimilarMovies=${includeSimilarMovies}`
    const result = this.http.get<any>(url)
    return result
  }

  getMovieArray(ids: number[]) {
    const url = `${this.apiUrl}/api/movieArray?movieArray=${JSON.stringify(ids)}`
    const result = this.http.get<any>(url)
    return result
  }

  searchedMovies(query: string) {
    const url = `${this.apiUrl}/api/searchMovies?query=${query}`
    const result = this.http.get<any>(url)
    return result
  }
}