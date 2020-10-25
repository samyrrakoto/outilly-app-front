import { RelayPoint } from './../../../models/relay-point';
import { AuthService } from './../../../services/auth.service';
import { RequestService } from './../../../services/request.service';
import { Bid } from './../../../models/bid';
import { Sale } from './../../../models/sale';
import { User } from './../../../models/user';
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

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
    localStorage.setItem('productId', '1');
    localStorage.setItem('relayId', '002743');
    localStorage.setItem('relayCountry', 'FR');
    this.productId = localStorage.getItem('productId');
    this.relayId = localStorage.getItem('relayId');
    this.relayCountry = localStorage.getItem('relayCountry');
    this.bid = new Bid();
    this.sale = new Sale();
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
          console.log('ERROR');
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
}
