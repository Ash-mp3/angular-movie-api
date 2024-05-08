import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { PopularMoviesComponent } from './component/popular-movies/popular-movies.component';
import { WatchlistComponent } from './component/watchlist/watchlist.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'popular', component: PopularMoviesComponent},
    {path: 'details/:id', component: MovieDetailsComponent},
    { path: 'watchlist', component: WatchlistComponent },
    { path: '**', component: LoginComponent} 
];
