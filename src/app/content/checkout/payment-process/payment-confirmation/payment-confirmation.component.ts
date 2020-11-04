import { RequestService } from './../../../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Sale } from 'src/app/models/sale';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  public order: Order;
  public email: string;
  public transactionId: string;
  public sale: Sale;
  public productUrl: string;

  constructor(private request: RequestService, private location: Location, private router: Router) {
    this.order = new Order();
    this.sale = new Sale();
    this.transactionId = sessionStorage.getItem('mangopayTransactionId');
  }

  ngOnInit(): void {
    this.getUserInfo()
      .then(() => { this.getOrder()
      .then(() => { this.getSale() });
      });
  }

  private getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getUserInfos().subscribe(
        (user: any) => {
          this.email = user.userProfile.email;
          resolve('Success');
        },
        (err: any) => {
          this.handleError();
          reject();
        }
      );
    });
  }

  private getOrder(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_ORDER, [sessionStorage.getItem('orderId')]).subscribe(
        (order: any) => {
          this.order = order;
          this.order.saleId = order.sale.id;
          resolve('Success');
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  private getSale(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getSaleCall(this.order.saleId.toString()).subscribe(
        (sale: any) => {
          this.sale = sale;
          this.productUrl = '/product/' + this.sale.product.slug + '/' + this.sale.product.id;
          resolve();
        },
        (error: any) => { reject(); }
      );
    });
  }

  private handleError(): void {
    const path: string = this.location.path();

    this.router.navigate(['/login']);
    sessionStorage.setItem('redirect_after_login', path);
  }
}
