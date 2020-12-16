import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from '../models/access-token';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public logged: boolean;
  public accessToken: string;
  model: any = {};

  constructor(
      private router: Router,
      private jwtHelper: JwtHelperService,
      private request: RequestService,
  ) { }

  public login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getJwtToken(credentials).subscribe((response: any) => {
        if (response.body.token) {
          this.setAccessToken(response.body);
          this.setUserInfosInSession();
          resolve(true);
        } else {
          reject(false);
        }
      }, () => {
        reject(false);
      });
    });
  }

  // Checking if token is set
  public isLoggedIn(): Observable<boolean> {
    if (localStorage.getItem('access_token') != null) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  public getLogStatus(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.isLoggedIn().subscribe({
        next: (value: boolean) => {
          this.logged = value;
          resolve(value);
        },
        error: () => {
          this.logged = null;
          reject();
        }
      })
    });
    this.accessToken = this.getTokenStatus();
    return promise;
  }

  // After clearing localStorage redirect to login screen
  public logout(params?: any): void {
    this.loggedIn.next(false);
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login'], {
      queryParams:
        params
    });
  }

  public getTokenStatus(): string {
    if (localStorage.getItem('access_token') === null) {
      return 'expired';
    }
    const accessToken: string = atob(localStorage.getItem('access_token').split('.')[1]);
    const timestamp: number = parseInt(JSON.parse(accessToken).exp + '000');
    const actualTimestamp: number = Date.now();

    return actualTimestamp > timestamp ? 'expired' : 'good';
  }

  // Verify user credentials on server to get token
  private getJwtToken(data: any): any {
    return this.request.login(data);
  }

  // After login save token and other values(if any) in localStorage
  private setAccessToken(response: AccessToken): void {
    localStorage.setItem('access_token', response.token);
  }

  private setUserInfosInSession(): void {
      const token: any = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));

      sessionStorage.setItem('username', token.username);
      sessionStorage.setItem('userId', token.userId);
      sessionStorage.setItem('userStatus', token.status);
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
