import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, pipe, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from '../models/access-token';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  model: any = {};

  constructor(
      private router: Router,
      private http: HttpClient,
      private jwtHelper: JwtHelperService,
      private request: RequestService,
  ) { }

  login(credentials) {
    return new Promise((resolve, reject) => {
      this.getJwtToken(credentials).subscribe(response => {
        if (response.body.token) {
          this.setAccessToken(response.body);
          this.setUserNameSession();
          resolve(true);
        } else {
          reject(false);
        }
      }, err => {
        reject(false);
      });
    });
  }

  // Checking if token is set
  isLoggedIn() {
    if (localStorage.getItem('access_token') != null){
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  // After clearing localStorage redirect to login screen
  logout() {
    this.loggedIn.next(false);
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  // Verify user credentials on server to get token
  private getJwtToken(data) {
    return this.request.login(data);
  }

  // After login save token and other values(if any) in localStorage
  private setAccessToken(response: AccessToken) {
    localStorage.setItem('access_token', response.token);
  }

  private setUserNameSession() {
      const token = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
      sessionStorage.setItem('username', token.username);
  }

  // Handle API errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `API returned code ${error.status}, ` +
          `login failed`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
