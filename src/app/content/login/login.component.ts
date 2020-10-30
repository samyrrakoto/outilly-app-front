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

  constructor(private auth: AuthService, private router: Router
  ) {}

  ngOnInit() {
    const accessToken: string = this.auth.getTokenStatus();

    if (accessToken !== null && accessToken !== 'expired') {
      console.log(accessToken);
      this.checkHasRedirectAfterLogin();
    }
  }

  ngAfterViewInit(): void {
    document.getElementById('username').focus();
  }

  public login(): void {
    this.auth.login(this.model)
    .then(() => {
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
