import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MoviesService } from '../services/movies.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
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
      imports: [DashboardComponent, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search winners by year', () => {
    const mockMovies = [
      { id: 1, year: 1980, title: "Can't Stop the Music", studios: ["Associated Film Distribution"], producers: ["Allan Carr"], winner: true }
    ];
    moviesService.getMovies.and.returnValue(of(mockMovies));

    component.searchYear = 1980;
    component.searchWinnersByYear();

    expect(moviesService.getMovies).toHaveBeenCalledWith({ winner: true, year: 1980 });
    expect(component.winnersByYear).toEqual(mockMovies);
  });
});
