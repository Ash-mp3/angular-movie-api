import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',

})

export class MoviesService {
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }


  getMovies(){
    const url = `${this.apiUrl}/api/getMovies`
    const result = this.http.get<any>(url)
    return result

  }

  getMovie(id: number){
    const url = `${this.apiUrl}/api/getMovie?id=${id}`
    const result = this.http.get<any>(url)
    return result
  }
}