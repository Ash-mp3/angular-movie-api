import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MoviesService } from '../../services/movies.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, MatTabsModule, NavbarComponent, MatCardModule, RouterModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit{

    movies: any[] = [];
    posterUrl = 'https://image.tmdb.org/t/p/w500';

    constructor(private moviesService: MoviesService) {

    }
    
    ngOnInit(): void {
        this.moviesService.getMovies().subscribe(contents => {
            this.movies = contents
          }
        )
        console.log(this.movies)
    }

}
