import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PageNameManager } from 'src/app/models/page-name-manager';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loginFailed: boolean = false;
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly pageTitle: string = 'Connexion';

  constructor(
    private auth: AuthService,
    private router: Router,
    private title: Title) {}

  ngOnInit() {
    this.pageNameManager.setTitle(this.pageTitle);
    const accessToken: string = this.auth.getTokenStatus();

    if (accessToken === 'good') {
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
      this.router.navigate(['/user/dashboard']);
    }
    else {
      this.router.navigate([sessionStorage.getItem("redirect_after_login")]);
    }
  }
}
