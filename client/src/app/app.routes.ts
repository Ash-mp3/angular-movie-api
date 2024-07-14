import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { PopularMoviesComponent } from './component/popular-movies/popular-movies.component';
import { WatchlistComponent } from './component/watchlist/watchlist.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    {path: 'login', component: WelcomeComponent },
    {path: 'popular', component: PopularMoviesComponent, canActivate: [authGuard]},
    {path: 'details/:id', component: MovieDetailsComponent, canActivate: [authGuard]},
    { path: 'watchlist', component: WatchlistComponent, canActivate: [authGuard]},
    { path: '**', component: WelcomeComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
