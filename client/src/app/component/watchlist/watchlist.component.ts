import { Component, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from "@angular/material/card";
import { MoviesService } from "../../services/movies.service";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UsersMoviesService } from "../../services/users-movies.service";

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
    watchedArray: string[] = []
    watchlistArray: string[] = []
	movies: any[] = [];
	posterUrl = "https://image.tmdb.org/t/p/w500";

	constructor(
		private moviesService: MoviesService,
		private usersMoviesService: UsersMoviesService
	) {}

	ngOnInit(): void {
		this.moviesService.getMovies().subscribe((contents) => {
			this.movies = contents;
		});
        this.usersMoviesService.userData$.subscribe((data) => {
            data['watched'].forEach((movie) => {
                this.watchlistArray.push(movie)
            });
            data['watchlist'].forEach((movie) => {
                this.watchlistArray.push(movie)
            });
            
        });
	}
}

