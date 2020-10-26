import { User } from './../../../../models/user';
import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { OrderSummaryComponent } from './../order-summary.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-information-summary',
  templateUrl: './information-summary.component.html',
  styleUrls: ['../order-summary.component.css', './information-summary.component.css']
})
export class InformationSummaryComponent extends OrderSummaryComponent implements OnInit {
  user: User;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
      super(request, router, auth, location);
      this.user = new User();
    }

  ngOnInit(): any {
    this.getUser();
  }

  private getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getUserInfos().subscribe({
        next: (value: User) => {
          this.user = value;
          resolve();
        },
        error: () => {
          console.log('ERROR');
          this.errorHandle('');
          reject();
        }
      });
    });
  }
}
