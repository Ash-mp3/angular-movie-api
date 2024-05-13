import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apikey: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWExMGE2NTAzMWViMWZmY2ExYzhlMTIxZGYzOWMyOSIsInN1YiI6IjY2M2EzOGU0Y2MyNzdjMDEyYjI0YjRlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Njbq6IfXUdWAEGfyb1BZGKkP5Tjrz-2DzoaJyfEkqWk' 
  constructor( private http: HttpClient) { }
  getquery(url: string): Observable<any>{
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.apikey}`, 'Content-Type': 'application/json'});
    return this.http.get<any>(url,{headers})
  }
}
