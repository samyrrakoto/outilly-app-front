import { AppComponent } from './../app.component';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = localStorage.getItem('access_token');
      var url = new URL(req.url);
      AppComponent.isBrowser.subscribe(isBrowser => {
        if (isBrowser) {
          var uriOrigin = url.origin + '/';
          if(uriOrigin === environment.apiBaseUri){
              req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken
                }
            });
        }
      }
      });

      return next.handle(req);
  }
}

