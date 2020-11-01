import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("access_token") != null) {
      this.checkHasRedirectAfterLogin();
    }
  }

  ngAfterViewInit(): void {
    document.getElementById('username').focus();
  }

  public login(): void {
    this.authService.login(this.model).then(
        () => {
          this.checkHasRedirectAfterLogin();
        },
        () => {
          this.loginFailed = true;
        }
    );
  }

  private checkHasRedirectAfterLogin(): void{
    if (sessionStorage.getItem("redirect_after_login") === null) {
      this.router.navigate(['user/dashboard']);
    } else {
      this.router.navigate([sessionStorage.getItem("redirect_after_login")]);
    }
  }
}
