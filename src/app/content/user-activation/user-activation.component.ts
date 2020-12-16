import { AuthService } from './../../services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {
  userId: number = 0;
  token: string = '';
  expiredToken: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private router: Router,
    private auth: AuthService
  )
  {}

  ngOnInit(): void {
    this.getParams()
      .then(() => {
        this.activateUser();
      });
  }

  private getParams(): Promise<void> {
    return new Promise((resolve) => {
      this.route.params.subscribe(
        (params) => {
          this.userId = +params['userId'];
          this.token = params['token'];
          resolve();
        }
      )
    });
  }

  private activateUser(): Promise<void> {
    const params: string = this.userId.toString() + '/' + this.token;
    const queryParams: any = { activated: true };

    return new Promise((resolve) => {
      this.request.getData(this.request.uri.USER_ACTIVATION, [params]).subscribe(
        () => {
          this.auth.logout(queryParams);
          resolve();
        },
        (error: any) => {
          if (error.status === 403) {
            this.expiredToken = true;
            resolve();
          }
        }
      )
    });
  }
}
