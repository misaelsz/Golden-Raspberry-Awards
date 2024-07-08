import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CommonModule]
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: any[] = [];
  studiosWithWinCount: any[] = [];
  producersWinInterval: any = { min: [], max: [] };
  winnersByYear: any[] = [];
  searchYear: number | null = null;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getProducersWinInterval();
  }

  getYearsWithMultipleWinners(): void {
    this.moviesService.getMovies({ projection: 'years-with-multiple-winners' }).subscribe(data => {
      this.yearsWithMultipleWinners = data.years;
    });
  }

  getStudiosWithWinCount(): void {
    this.moviesService.getMovies({ projection: 'studios-with-win-count' }).subscribe(data => {
      this.studiosWithWinCount = data.studios.slice(0, 3); // Pegando apenas os 3 primeiros
    });
  }

  getProducersWinInterval(): void {
    this.moviesService.getMovies({ projection: 'max-min-win-interval-for-producers' }).subscribe(data => {
      this.producersWinInterval = data;
    });
  }

  searchWinnersByYear(): void {
    if (this.searchYear) {
      this.moviesService.getMovies({ winner: true, year: this.searchYear }).subscribe(data => {
        this.winnersByYear = [data];
      });
    }
  }
}
