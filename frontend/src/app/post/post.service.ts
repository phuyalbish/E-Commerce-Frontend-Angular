import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'https://dummyjson.com';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // errorHandler: (err: any, caught: Observable<Object>) => ObservableInput<any>;
  constructor(private httpClient: HttpClient) {}

  // Get all Methods
  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/products/')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  // Create Data
  create(post: Post): Observable<any> {
    return this.httpClient
      .post(
        (this.apiURL = '/products/'),
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  //Find data
  find(id: number): Observable<any> {
    return (
      this,
      this.httpClient
        .get(this.apiURL + '/products/' + id)
        .pipe(catchError((error: HttpErrorResponse) => throwError(error)))
    );
  }
  // Update data

  //Find data
  update(id: number, post: Post): Observable<any> {
    return this.httpClient
      .put(
        this.apiURL + '/products/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  //Delete
  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/products/' + id)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
