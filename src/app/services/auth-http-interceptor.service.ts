import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = localStorage.getItem('access_token');
      req = req.clone({
          setHeaders: {
              Authorization: "Bearer " + authToken
          }
      });
      return next.handle(req);
  }
}
