import { Component, OnInit } from '@angular/core';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';


@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInput, MatFormField, MatLabel, MatIcon
  ],
  templateUrl: './review-section.component.html',
  styleUrl: './review-section.component.css'
})
export class ReviewSectionComponent implements OnInit{


  constructor( 
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ){

  }

  rating: number = null
  comment: string = ""
  reviews: any = {}

  rateMovie(num: number){
    if(num === this.rating){
      this.rating = null
    } else {
      this.rating = num
    }
  }


  ngOnInit(): void {

    const id = Number(this.route.snapshot.params['id']);

    this.moviesService.getMovieReviews(id).subscribe((item: any) => {
      console.log(item)
      this.reviews = item
    })
  }
}
