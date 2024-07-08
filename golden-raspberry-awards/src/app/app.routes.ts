import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movies-list', component: MoviesListComponent },
];
