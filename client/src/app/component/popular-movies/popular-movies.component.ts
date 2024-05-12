import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule,
    NavbarComponent,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  providers: [
    {provide:MAT_TOOLTIP_DEFAULT_OPTIONS, useValue:{showDelay: 350, hideDelay: 0}}
  ],
  templateUrl: './popular-movies.component.html',
  styleUrl: './popular-movies.component.css',
})
export class PopularMoviesComponent implements OnInit {
  movies: any[] = [];

  posterUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(contents => {
        this.movies = contents
      }
    )
  }
}
