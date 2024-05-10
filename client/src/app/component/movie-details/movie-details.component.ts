import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule,  Router, NavigationEnd  } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('navRef') sideNav: ElementRef

  movie: any = null
  similarMovies: any = []
  posterUrl = 'https://image.tmdb.org/t/p/w500'
  isLoading: boolean = null
  
  constructor( 
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.getNewPageContents()

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getNewPageContents()
        this.animateNavbar()
      }
    });

  }

  getNewPageContents(){
    this.isLoading = true

    this.movie = null
    this.similarMovies = []

    const id = Number(this.route.snapshot.params['id']);
    this.moviesService.getMovie(id).subscribe(item => {
      this.movie = item
    })

    this.moviesService.getSimilarMovies(id).subscribe(item => {
      this.similarMovies = item
    })

    this.isLoading = false



  }


  ngAfterViewInit(): void {
    this.animateNavbar()
  }

  animateNavbar(){
    const sideNavHtml = this.sideNav.nativeElement

    sideNavHtml.classList.remove('nav-animation');

    setTimeout(() => {
      sideNavHtml.classList.add('nav-animation');
    });
  }
}
