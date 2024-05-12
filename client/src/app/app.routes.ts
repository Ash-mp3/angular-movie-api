import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { PopularMoviesComponent } from './component/popular-movies/popular-movies.component';
import { WatchlistComponent } from './component/watchlist/watchlist.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import {  redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { authGuard } from './core/auth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToPopular = () => redirectLoggedInTo(['popular']);
// canActivate: [authGuard]
export const routes: Routes = [
    {path: 'login', component: WelcomeComponent },
    {path: 'popular', component: PopularMoviesComponent, canActivate: [authGuard]},
    {path: 'details/:id', component: MovieDetailsComponent},
    { path: 'watchlist', component: WatchlistComponent },
    { path: '**', component: WelcomeComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
