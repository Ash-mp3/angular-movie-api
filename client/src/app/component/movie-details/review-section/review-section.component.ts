import { Component, OnInit } from "@angular/core";
import { MatInput, MatFormField, MatLabel } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from "@angular/router";
import { RouterModule } from "@angular/router";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ActivatedRoute } from "@angular/router";
import { MovieReviewService } from "../../../services/firebase/movie-reviews.service";



@Component({
	selector: "app-review-section",
	standalone: true,
	imports: [
		CommonModule,
        FormsModule,
		RouterModule,
		MatInput,
		MatFormField,
		MatLabel,
        MatIcon,
        MatButtonModule,
        MatProgressBarModule
	],
	templateUrl: "./review-section.component.html",
	styleUrl: "./review-section.component.css",
})
export class ReviewSectionComponent implements OnInit {

  constructor( 
    private movieReviewService: MovieReviewService,
    private route: ActivatedRoute,
    private router: Router,
  ){

	rating: number = null;
	comment: string = "";
    reviews: any = null;
    commentsLoading: boolean = false;

	rateMovie(num: number) {
		if (num === this.rating) {
			this.rating = null;
		} else {
			this.rating = num;
        }
	}

	ngOnInit(): void {
		this.getMovieReviews();
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.getMovieReviews();
			}
		});
	}

    //gets called when the component is created and on every submission
	async getMovieReviews() {
        const id = this.route.snapshot.params["id"];
        (await this.moviesService.getMovieReviews(id)).subscribe((item) => {
            this.reviews = item;
        });
    }
    
    //gets called when the user submits a comment
    submitComment() {
        const movieId = this.route.snapshot.params["id"];
        if(this.comment === "" && this.rating === null) {
            return
        }
        this.moviesService.checkIfMovieIsNewToDb(movieId, this.comment, this.rating)
        //clears form and updates comment list
        this.comment = ""
        this.rating = null
        this.commentsLoading = true
        setTimeout(() => {
            this.commentsLoading = false
            this.getMovieReviews();
        }, 1500);
    }
}
