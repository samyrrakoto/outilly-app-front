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
  priceToPay: number;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
    this.bid = new Bid();
    this.sale = new Sale();
    this.areConditionsAccepted = false;
    this.priceToPay = 0;
    this.relayId = localStorage.getItem('relayId');
    this.relayCountry = localStorage.getItem('relayCountry');
    this.productId = localStorage.getItem('saleId');
  }

  ngOnInit(): Promise<any> {
    return new Promise((resolve) => {
      this.getSale()
      .then(() => this.getBid())
      .then(() => {
        this.checkRelay();
        resolve()
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
          this.errorHandle();
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

  private getCurrentLocation(): Promise<string> {
    return new Promise<any> ((resolve) => {
      const currentLocation = '/checkout/order-summary';

      resolve(currentLocation);
    })
  }

  private deconnect(currentLocation: string): Promise<string> {
    return new Promise ((resolve) => {
      this.auth.logout()
      resolve(currentLocation)
    })
  }

  protected errorHandle(): void {
    this.getCurrentLocation()
      .then((currentLocation) => this.deconnect(currentLocation))
      .then((currentLocation) => {
        sessionStorage.setItem('redirect_after_login', currentLocation);
      });
  }

  public checkConditionsAccepted(conditions: boolean): void {
    this.areConditionsAccepted = conditions;
  }

  public getRealPriceToPay(priceToPay: number): void {
    this.priceToPay = priceToPay;
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
