import { Component, OnInit } from '@angular/core';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { MovieReviewService } from '../../../services/firebase/movie-reviews.service';



@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInput, MatFormField, MatLabel, MatIcon
  ],
  templateUrl: './review-section.component.html',
  styleUrl: './review-section.component.css'
})
export class ReviewSectionComponent implements OnInit{


  constructor( 
    private movieReviewService: MovieReviewService,
    private route: ActivatedRoute,
    private router: Router,
  ){

  }

  rating: number = null
  comment: string = ""
  reviews: any = null

  rateMovie(num: number){
    if(num === this.rating){
      this.rating = null
    } else {
      this.rating = num
    }
  }


  ngOnInit(): void {
    this.getMovieReviews()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getMovieReviews()
      }
    });
  }


  getMovieReviews(){

    const id = Number(this.route.snapshot.params['id']);

    this.movieReviewService.getMovieReviews(id).subscribe((item: any) => {
      this.reviews = item
    })
  }


}
