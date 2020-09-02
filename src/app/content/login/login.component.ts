// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loginFailed = false;

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("access_token") != null)
    {
      this.checkHasRedirectAfterLogin();
    }
  }

  login() {
    this.authService.login(this.model).then(
        (success) => {
          this.checkHasRedirectAfterLogin();
        }, (failure) => {
          this.loginFailed = true;
        }
    );
  }

  private checkHasRedirectAfterLogin(){
    if (sessionStorage.getItem("redirect_after_login") === null){
      this.router.navigate(['user/dashboard']);
    } else {
      this.router.navigate([sessionStorage.getItem("redirect_after_login")]);
    }
  }
}
