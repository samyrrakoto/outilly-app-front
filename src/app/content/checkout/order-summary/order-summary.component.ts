
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Sale } from 'src/app/models/sale';
import { Bid } from 'src/app/models/bid';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  sale: Sale;
  user: User;
  bid: Bid;
  productId: string;
  relayId: string;
  relayCountry: string;
  deliveryMethod: string;
  areConditionsAccepted: boolean;
  priceToPay: number;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
    this.bid = new Bid();
    this.sale = new Sale();
    this.areConditionsAccepted = false;
    this.priceToPay = 0;
    if ((this.productId = localStorage.getItem('saleId')) === null) {
      this.router.navigate(['/user/dashboard/activity-log/purchases']);
    }
  }

  ngOnInit(): Promise<any> {
    return new Promise((resolve) => {
      this.getSale()
      .catch(() => this.errorHandle('sale'))
      .then(() => this.getBid())
      .catch(() => this.errorHandle('bid'))
      .then(() => {
        this.checkDeliveryMethod();
        this.checkDelivery();
        resolve();
      });
    });
  }

  protected getSale(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getSaleCall(this.productId).subscribe({
        next: (value: Sale) => {
          this.sale = value;
          resolve();
        },
        error: () => {
          reject();
        }
      });
    })
  }

  private getBid(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_BIDS_AND_SALES).subscribe({
        next: (value: any) => {
          for (const elem of value) {
            if (elem.sale.id === parseInt(this.productId)) {
              this.bidMapping(elem);
            }
          }
          resolve();
        },
        error: () => {
          reject();
        }
      });
    });
  }

  public getUser(user: User) {
    this.user = user;
  }

  private bidMapping(value: any) {
    this.bid.id = value.id;
    this.bid.amount = value.amount
    this.bid.counterOfferAmount = value.counterOfferAmount;
    this.bid.isAccepted = value.isAccepted;
    this.bid.isClosed = value.isClosed;
  }

  private deconnect(): Promise<string> {
    return new Promise (() => {
      this.auth.logout();
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

  public checkConditionsAccepted(conditions: boolean): void {
    this.areConditionsAccepted = conditions;
  }

  public getRealPriceToPay(priceToPay: number): void {
    this.priceToPay = priceToPay;
  }

  private checkDeliveryMethod(): void {
    if (localStorage.getItem('hand-delivery') === 'true') {
      this.deliveryMethod = 'hand';
    }
    else {
      this.deliveryMethod = 'mondial-relay';
      this.relayId = localStorage.getItem('relayId');
      this.relayCountry = localStorage.getItem('relayCountry');
    }
  }

  private checkDelivery(): void {
    if (this.checkHandDelivery() === false) {
      this.checkRelay();
    }
  }

  private checkRelay(): void {
    if (this.isEmpty(localStorage.getItem('relayId')) || this.isEmpty(localStorage.getItem('relayCountry'))) {
      this.router.navigate(['checkout/delivery-information/mondial-relay-selector']);
    }
    else {
      this.relayId = localStorage.getItem('relayId');
      this.relayCountry = localStorage.getItem('relayCountry');
    }
  }

  private checkHandDelivery(): boolean {
    return localStorage.getItem('hand-delivery') === 'true';
  }

  private isEmpty(value: any): boolean {
    return [null, 'undefined'].includes(value);
  }
}
