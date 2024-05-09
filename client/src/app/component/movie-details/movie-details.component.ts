import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movie: any = null
  similarMovies: any = []
  posterUrl = 'https://image.tmdb.org/t/p/w500'
  
  constructor( 
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.moviesService.getMovie(id).subscribe(item => {
      this.movie = item
    })

    this.moviesService.getSimilarMovies(id).subscribe(item => {
      this.similarMovies = item
    })

  }
}
