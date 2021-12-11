import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  WebApi = environment.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    })
  };

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.WebApi}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.WebApi}/users/${id}`);
  }

  createUser(user: User) {
    return this.http.post(`${this.WebApi}/users`, JSON.stringify(user), this.httpOptions)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      }),
      catchError(this.errorHandler)
    );
  }

  patchUser(user: User, id: number) {
    return this.http.patch(`${this.WebApi}/users/${id}`, JSON.stringify(user), this.httpOptions)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      }),
      catchError(this.errorHandler)
    );
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.WebApi}/users/${id}`, JSON.stringify(user), this.httpOptions)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      }),
      catchError(this.errorHandler)
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.WebApi}/users/${id}`, this.httpOptions)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      }),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}



