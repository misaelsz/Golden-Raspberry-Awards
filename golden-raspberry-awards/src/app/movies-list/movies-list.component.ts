import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CommonModule]
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  page: number = 0;
  size: number = 10;
  totalPages!: number;
  filterYear!: number;
  filterWinner!: boolean;
  maxPagesToShow: number = 5;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const params = {
      page: this.page,
      size: this.size,
      year: this.filterYear,
      winner: this.filterWinner
    };
    this.moviesService.getMovies(params).subscribe(data => {
      this.movies = data.content;
      this.totalPages = data.totalPages;
    });
  }

  applyFilters(): void {
    let queryParams: any = {
      page: this.page,
      size: this.size
    };
    if (this.filterYear) {
      queryParams.year = this.filterYear;
    }
    if (this.filterWinner !== undefined) {
      queryParams.winner = this.filterWinner;
    }
    this.moviesService.getMovies(queryParams).subscribe(data => {
      this.movies = data.content;
      this.totalPages = data.totalPages;
    });
  }

  changePage(page: number): void {
    this.page = page;
    this.getMovies();
  }

  getPages(): number[] {
    const startPage = Math.floor(this.page / this.maxPagesToShow) * this.maxPagesToShow;
    return Array.from({ length: this.maxPagesToShow }, (_, i) => startPage + i).filter(p => p < this.totalPages);
  }

  goToFirstPage(): void {
    this.changePage(0);
  }

  goToLastPage(): void {
    this.changePage(this.totalPages - 1);
  }

  goToPreviousPageSet(): void {
    const startPage = Math.floor(this.page / this.maxPagesToShow) * this.maxPagesToShow;
    this.changePage(Math.max(startPage - this.maxPagesToShow, 0));
  }

  goToNextPageSet(): void {
    const startPage = Math.floor(this.page / this.maxPagesToShow) * this.maxPagesToShow;
    this.changePage(Math.min(startPage + this.maxPagesToShow, this.totalPages - 1));
  }
}
