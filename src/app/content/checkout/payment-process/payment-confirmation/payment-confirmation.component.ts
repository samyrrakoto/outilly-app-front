import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Sale } from 'src/app/models/sale';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  public order: Order;
  public readonly gifCollection: Array<string> = [
    'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
    'https://media.giphy.com/media/l2SpXyO9TOJCrCbo4/giphy.gif',
    'https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif'
  ];
  public readonly randomNb: number = Math.floor(Math.random() * (this.gifCollection.length));
  public email: string;
  public transactionId: string;
  public sale: Sale;
  public productUrl: string;

  constructor(private request: RequestService,
    private location: Location,
    private router: Router,
    private auth: AuthService)
  {
    this.order = new Order();
    this.sale = new Sale();
    this.transactionId = sessionStorage.getItem('mangopayTransactionId');
  }

  ngOnInit(): void {
    this.auth.getLogStatus()
      .then(() => this.getUserInfo())
      .then(() => { this.getOrder()
      .catch((error: any) => this.handleError(error) )
      .then(() => { this.getSale() })
      .catch((error: any) => this.handleError(error) );
      })
;
  }

  private getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {

      // If user log and token is not expired
      if (this.auth.logged && this.auth.getTokenStatus() === 'good') {
        this.request.getUserInfos().subscribe(
          (user: any) => {
            this.email = user.userProfile.email;
            resolve('Success');
          },
          (err: any) => {
            reject();
          }
        );
      }
      // If user is not logged or token is expired
      else {
        reject();
      }
    });
  }

  private getOrder(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!sessionStorage.getItem('orderId')) {
        reject('orderMissing');
      }
      else {
        if (this.auth.logged && this.auth.getTokenStatus() === 'good') {
          this.request.getData(this.request.uri.GET_ORDER, [sessionStorage.getItem('orderId')]).subscribe(
            (order: any) => {
              this.order = order;
              this.order.saleId = order.sale.id;
              resolve();
            },
            () => {
              reject('orderFailed');
            }
          );
        }
        else {
          reject('loginFailed');
        }
      }
    });
  }

  private getSale(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.order.saleId) {
        reject('orderMissing');
      }
      else {
        // If user log and token is not expired
        if (this.auth.logged && this.auth.getTokenStatus() === 'good') {
          this.request.getSaleCall(this.order.saleId.toString()).subscribe(
            (sale: any) => {
              this.sale = sale;
              this.productUrl = '/product/' + this.sale.product.slug + '/' + localStorage.getItem('saleId');
              resolve();
            },
            (error: any) => { reject(); }
          );
        }
        else {
          reject('saleMissing');
        }
      }
    });
  }

  private loginFailedError(): void {
    const path: string = this.location.path();

    this.router.navigate(['/login']);
    sessionStorage.setItem('redirect_after_login', path);
  }

  private saleMissingError(): void {
    this.router.navigate(['/checkout/order-summary']);
  }

  private orderMissingError(): void {
    this.router.navigate(['/checkout/order-summary']);
  }

  private handleError(errorName: string = ''): void {
    if (errorName !== '') {
      this[errorName + 'Error']();
    }
  }
}
