import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { PopularMoviesComponent } from './component/popular-movies/popular-movies.component';
import { WatchlistComponent } from './component/watchlist/watchlist.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

export const routes: Routes = [
    {path: 'login', component: WelcomeComponent},
    {path: 'popular', component: PopularMoviesComponent},
    {path: 'details/:id', component: MovieDetailsComponent},
    { path: 'watchlist', component: WatchlistComponent },
    { path: '**', component: WelcomeComponent} 
];
