import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {NavbarComponent} from '../navbar/navbar.component'
@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [MatInputModule, MatDividerModule, MatCardModule,MatToolbarModule,MatIconModule,MatFormFieldModule,
    CommonModule, RouterModule,NavbarComponent
  ],
  templateUrl: './popular-movies.component.html',
  styleUrl: './popular-movies.component.css'
})
export class PopularMoviesComponent implements OnInit {

  movies: any[] = []
  
  posterUrl = 'https://image.tmdb.org/t/p/w500'

  constructor( private moviesService: MoviesService ){

  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(contents => {
        this.movies = contents
        console.log(contents)
      }
    )
  }

}