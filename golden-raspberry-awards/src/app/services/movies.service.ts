import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'https://tools.texoit.com/backend-java/api/movies';

  constructor(private http: HttpClient) { }

  getMovies(params: any): Observable<any> {
    let queryParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get(this.apiUrl, { params: queryParams });
  }
}