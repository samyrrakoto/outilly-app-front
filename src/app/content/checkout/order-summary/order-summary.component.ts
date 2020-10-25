import { AuthService } from './../../../services/auth.service';
import { RequestService } from './../../../services/request.service';
import { Bid } from './../../../models/bid';
import { Sale } from './../../../models/sale';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  sale: Sale;
  bid: Bid;
  productId: string;
  relayId: string;
  relayCountry: string;
  areConditionsAccepted: boolean;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
    this.bid = new Bid();
    this.sale = new Sale();
    this.areConditionsAccepted = false;
    this.productId = localStorage.getItem('saleId');
    localStorage.setItem('saleId', '3');
    this.checkRelay();
  }

  ngOnInit(): Promise<any> {
    return new Promise((resolve) => {
      this.getSale()
      .then(() => this.getBid())
      .then(() => resolve());
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
          console.log('ERROR');
          this.errorHandle();
          reject();
        }
      });
    });
  }

  private bidMapping(value: any) {
    this.bid.id = value.id;
    this.bid.amount = value.amount
    this.bid.counterOfferAmount = value.counterOfferAmount;
    this.bid.isAccepted = value.isAccepted;
    this.bid.isClosed = value.isClosed;
  }

  protected errorHandle(): void {
    sessionStorage.setItem('redirect_after_login', this.location.path());
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  public addItem(item: boolean): void {
    this.areConditionsAccepted = item;
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

  private isEmpty(value: any): boolean {
    return [null, 'undefined'].includes(value);
  }
}
