import { TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MoviesService } from '../services/movies.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: any;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies']);
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: () => '1', // mock parameter value
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [MoviesListComponent, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should apply filters and update movies', () => {
    const mockMovies = {
      content: [{ id: 1, year: 1980, title: "Can't Stop the Music", studios: ["Associated Film Distribution"], producers: ["Allan Carr"], winner: true }],
      totalPages: 1
    };
    moviesService.getMovies.and.returnValue(of(mockMovies));
  
    component.filterYear = 1980;
    component.applyFilters();
  
    expect(moviesService.getMovies).toHaveBeenCalledWith({ page: 0, size: 10, year: 1980 });
    expect(component.movies).toEqual(mockMovies.content);
    expect(component.totalPages).toEqual(mockMovies.totalPages);
  });
  
  it('should apply filters with winner and update movies', () => {
    const mockMovies = {
      content: [{ id: 1, year: 1980, title: "Can't Stop the Music", studios: ["Associated Film Distribution"], producers: ["Allan Carr"], winner: true }],
      totalPages: 1
    };
    moviesService.getMovies.and.returnValue(of(mockMovies));
  
    component.filterYear = 1980;
    component.filterWinner = true;
    component.applyFilters();
  
    expect(moviesService.getMovies).toHaveBeenCalledWith({ page: 0, size: 10, year: 1980, winner: true });
    expect(component.movies).toEqual(mockMovies.content);
    expect(component.totalPages).toEqual(mockMovies.totalPages);
  });
});
