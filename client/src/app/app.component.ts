import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PopularMoviesComponent } from './component/popular-movies/popular-movies.component';

import { environment } from '../environments/environment.dev';
import { SpinnerComponent } from './component/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, PopularMoviesComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';


  ngOnInit(): void {
    console.log(environment.apiUrl)
  }
}
