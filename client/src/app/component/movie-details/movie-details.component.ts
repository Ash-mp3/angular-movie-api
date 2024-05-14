import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
} from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { UsersMoviesService } from "../../services/users-movies.service";
import { ActivatedRoute } from "@angular/router";
import { CommonModule, ViewportScroller } from "@angular/common";
import { RouterModule, Router, NavigationEnd } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { ReviewSectionComponent } from "./review-section/review-section.component";

import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";

@Component({
	selector: "app-movie-details",
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		NavbarComponent,
		ReviewSectionComponent,
		MatIcon,
		MatButton,
		MatCard,
	],
	templateUrl: "./movie-details.component.html",
	styleUrl: "./movie-details.component.css",
})
export class MovieDetailsComponent implements OnInit, AfterViewInit {
	@ViewChild("navRef") sideNav: ElementRef;

	hasSeenMovie: boolean = false;
	isInWatchList: boolean = false;
	movie: any = null;
	userData: any;
	similarMovies: any = [];
	posterUrl = "https://image.tmdb.org/t/p/w500";
	isLoading: boolean = false;
	isSmallScreen: boolean = window.innerWidth < 731 ? true : false;

	constructor(
		private moviesService: MoviesService,
		private route: ActivatedRoute,
		private router: Router,
		private viewportScroller: ViewportScroller,
		private usersMoviesService: UsersMoviesService
	) {}

	ngOnInit(): void {
		//get user data (watchlist and watched movies) from usersMoviesService
		//then check to see if the current moveie has been seen.
		this.usersMoviesService.userData$.subscribe((data) => {
			this.userData = data;
		});
		this.getNewPageContents();

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.getNewPageContents();
				this.animateNavbar();
				if (this.isSmallScreen) {
					window.scrollTo({ top: 0 /* , behavior: 'smooth' */ });
				}
			}
		});

		window.addEventListener("resize", () => {
			this.isSmallScreen = window.innerWidth < 731 ? true : false;
		});
	}

	getNewPageContents() {
		this.isLoading = true;

		this.movie = null;
		this.similarMovies = [];

		const id = Number(this.route.snapshot.params["id"]);
		this.moviesService.getMovie(id).subscribe((item) => {
			this.movie = item;
		});

		this.moviesService.getSimilarMovies(id).subscribe((item) => {
			this.similarMovies = item;
			this.isLoading = false;
		});

		this.userData.watched.forEach((movieId) => {
			if (movieId === this.movie.id) {
				this.hasSeenMovie = true;
			}
		});
		this.userData.watchlist.forEach((movieId) => {
			if (movieId === this.movie.id) {
				this.isInWatchList = true;
			}
		});
	}

	ngAfterViewInit(): void {
		this.animateNavbar();
	}

	animateNavbar() {
		const sideNavHtml = this.sideNav.nativeElement;

		sideNavHtml.classList.remove("nav-animation");

		setTimeout(() => {
			sideNavHtml.classList.add("nav-animation");
		});
	}

    toggleHasSeenMovie(movieId: string) {
        const typeOfList = 'watched'
		if (this.hasSeenMovie) {
			this.usersMoviesService.removeFromWatchedOrWatchlist(movieId, typeOfList);
		} else {
			this.usersMoviesService.addToWatchedOrWatchlist(movieId, typeOfList);
		}
		this.hasSeenMovie = !this.hasSeenMovie;
    }
    
    toggleIsInWatchlist(movieId: string) {
        const typeOfList = 'watchlist'
		if (this.isInWatchList) {
			this.usersMoviesService.removeFromWatchedOrWatchlist(movieId, typeOfList);
		} else {
			this.usersMoviesService.addToWatchedOrWatchlist(movieId, typeOfList);
		}
		this.isInWatchList = !this.isInWatchList;
	}
}
