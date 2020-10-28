import { User } from './../../../../models/user';
import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { OrderSummaryComponent } from './../order-summary.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-information-summary',
  templateUrl: './information-summary.component.html',
  styleUrls: ['../order-summary.component.css', './information-summary.component.css']
})
export class InformationSummaryComponent implements OnInit {
  user: User;
  @Output() userEmitter: EventEmitter<User> = new EventEmitter<User>();

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
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
          this.userEmitter.emit(this.user);
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

  protected errorHandle(type: string): void {
    switch (type) {
      case 'bid':
      case 'sale':
        this.deconnect()
          .then(() => sessionStorage.setItem('redirect_after_login', 'checkout/order-summary'));
          break;
      default:
        this.deconnect();
        break;
    }
  }

    private deconnect(): Promise<string> {
      return new Promise (() => {
        this.auth.logout();
      });
    }
}
