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
          console.log("Login succes");
          this.router.navigate(['home']);
        }, (failure) => {
          console.log("Login fail");
          this.loginFailed = true;
        }
    );
  }
}
