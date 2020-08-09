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
    this.authService.logout();
  }

  login() {
    this.authService.login(this.model).then(
        (success) => {
          this.router.navigate(['user/dashboard']);
        }, (failure) => {
          this.loginFailed = true;
        }
    );
  }
}
