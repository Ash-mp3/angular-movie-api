import { Component, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from "@angular/material/card";
import { MoviesService } from "../../services/backend-api/movies.service";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UsersMoviesService } from "../../services/firebase/users-movies.service";

@Component({
	selector: "app-watchlist",
	standalone: true,
	imports: [
		CommonModule,
		MatTabsModule,
		NavbarComponent,
		MatCardModule,
		RouterModule,
	],
	templateUrl: "./watchlist.component.html",
	styleUrl: "./watchlist.component.css",
})
export class WatchlistComponent implements OnInit {
	watchedArray = [];
	watchlistArray = [];
	movies: any[] = [];
	posterUrl = "https://image.tmdb.org/t/p/w500";

	constructor(
		private moviesService: MoviesService,
		private usersMoviesService: UsersMoviesService
	) {}

	ngOnInit() {
		this.moviesService.getMovies().subscribe((contents) => {
			this.movies = contents;
		});
		this.usersMoviesService.userData$.subscribe((data) => {
            data["watched"].forEach((movie) => {
                this.getMovieImg(movie, "watched");
			});
            data["watchlist"].forEach((movie) => {
                this.getMovieImg(movie, "watchlist");
			});
		});
	}

    getMovieImg(movieId: number, movieType: string) {
        this.moviesService.getMovie(Number(movieId), false).subscribe((contents) => {
            const movieImg = this.posterUrl + contents.selectedMovie.poster_path;
            if (movieType === "watched") { 
                this.watchedArray.push({movieId: movieId, poster_path: movieImg});
            } else if (movieType === "watchlist") { 
                this.watchlistArray.push({movieId: movieId, poster_path: movieImg});
            }
        });
	}
}
