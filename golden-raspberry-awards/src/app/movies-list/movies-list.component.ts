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
    this.page = 0; // Resetar para a primeira página ao aplicar filtros
    this.getMovies();
  }

  changePage(page: number): void {
    this.page = page;
    this.getMovies();
  }
}
