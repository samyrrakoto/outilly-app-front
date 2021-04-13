import { storage } from 'src/app/parameters';
import { StorageService, StorageType } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from 'src/app/models/access-token';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public logged: boolean;
  public accessToken: string;

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private request: RequestService,
    private storageService: StorageService)
  {
    this.storageService.addExclusiveStorageData('typeform');
    this.storageService.addExclusiveStorageData('cookies');
  }

  public login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getJwtToken(credentials).subscribe((response: any) => {
        if (response.body.token) {
          this.setAccessToken(response.body);
          this.setUserInfosInSession();
          this.logged = true;
          resolve(true);
        }
        else {
          reject(false);
        }
      }, () => {
        reject(false);
      });
    });
  }

  // Checking if token is set
  public isLoggedIn(): Observable<boolean> {
    if (localStorage.getItem('access_token') !== null) {
      this.loggedIn.next(true);
    }
    else {
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

  /*
  ** After clearing localStorage redirect to login screen
  ** soft parameter allows to keep 'redirect_after_url' after deconnection
  */
  public logout(params?: any, soft: boolean = false): void {
    soft ? this.storageService.addExclusiveStorageData(storage.REDIRECT_AFTER_LOGIN, StorageType.SESSION) : null;
    this.logged = false;
    this.loggedIn.next(false);
    this.storageService.reset()
    this.router.navigate(['/login'], {
      queryParams:
        params
    });
  }

  public addExclusiveStorageData(name: string, type: StorageType = StorageType.LOCAL): void {
    this.storageService.addExclusiveStorageData(name, type);
  }

  public removeExclusiveStorageData(name: string, type: StorageType = StorageType.LOCAL): void {
    this.storageService.removeExclusiveStorageData(name, type);
  }

  public setRedirectionUrl(url: string): void {
    sessionStorage.setItem(storage.REDIRECT_AFTER_LOGIN, url);
  }

  public resetRedirectionUrl(): void {
    sessionStorage.removeItem(storage.REDIRECT_AFTER_LOGIN);
  }

  public getRedirectionUrl(): string {
    return sessionStorage.getItem(storage.REDIRECT_AFTER_LOGIN);
  }

  public hasRedirectionUrl(): boolean {
    return sessionStorage.getItem(storage.REDIRECT_AFTER_LOGIN) !== null;
  }

  public isLogged(): boolean {
    return this.getTokenStatus() === 'good' && this.logged;
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

  public getUserStatus(): string {
    const userToken: string = atob(localStorage.getItem('access_token').split('.')[1]);

    return JSON.parse(userToken).status;
  }

  public getUserProfileCompletion(): boolean {
    const userProfileCompletionToken: string = atob(localStorage.getItem('access_token').split('.')[1]);

    return JSON.parse(userProfileCompletionToken).isCompleted;
  }

  public isUserActivated(): boolean {
    return this.getUserStatus() === 'activated';
  }

  public isUserCompleted(): boolean {
    return this.getUserProfileCompletion();
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

      localStorage.setItem('username', token.username);
      localStorage.setItem('userId', token.userId);
      localStorage.setItem('userStatus', token.status);
  }

  public sendActivationMail(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.SEND_ACTIVATION_MAIL, [localStorage.getItem('userId')]).subscribe(
        (res: any) => {
          resolve();
        }
      );
    });
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
