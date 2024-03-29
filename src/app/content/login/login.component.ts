import { InputService } from 'src/app/services/input.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
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
  activated: boolean = false;
  readonly pageTitle: string = 'Connexion';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private notification: NotificationService,
    public inputService: InputService
  )
  {}

  ngOnInit() {
    this.pageNameManager.setTitle(this.pageTitle);
    const accessToken: string = this.auth.getTokenStatus();
    this.getParams();

    if (accessToken === 'good') {
      this.checkHasRedirectAfterLogin();
    }
  }

  ngAfterViewInit(): void {
    if (document.getElementById('username')) {
      document.getElementById('username').focus();
    }
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

  private getParams(): Promise<void> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe(
        (params: any) => {
          this.activated = params['activated'];
          resolve();
        }
      )
    });
  }

  private checkHasRedirectAfterLogin(): void {
    if (sessionStorage.getItem("redirect_after_login") === null) {
      this.notification.checkAllNotifications();
      this.router.navigate(['/user/dashboard']);
    }
    else {
      this.router.navigate([sessionStorage.getItem("redirect_after_login")]);
    }
  }

  public closeNotification(notif: HTMLInputElement): void {
    notif.remove();
  }
}
