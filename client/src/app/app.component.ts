import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PopularMoviesComponent } from './component/popular-movies/popular-movies.component';

import { environment } from '../environments/environment.dev';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, PopularMoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

  posterUrl = 'https://image.tmdb.org/t/p/w500'

  ngOnInit(): void {
    console.log(environment.apiUrl)
  }
}
