import { PageNameManager } from 'src/app/models/page-name-manager';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Sale } from 'src/app/models/sale';
import { Bid } from 'src/app/models/bid';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { Recipient } from 'src/app/models/recipient';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  sale: Sale;
  isSaleAvailable: boolean;
  user: User;
  recipient: Recipient;
  bid: Bid;
  saleId: string;
  relayId: string;
  relayCountry: string;
  deliveryMethod: string;
  areConditionsAccepted: boolean;
  priceToPay: number;
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly pageTitle: string = 'Récapitulatif de commande';

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location,
    public saleManager: SaleManagerService,
    private title: Title)
  {
    this.bid = new Bid();
    this.sale = new Sale();
    this.areConditionsAccepted = false;
    this.priceToPay = 0;
  }

  ngOnInit(): Promise<any> {
    this.pageNameManager.setTitle(this.pageTitle);
    this.saleId = localStorage.getItem('saleId');

    return new Promise((resolve) => {
      this.auth.getLogStatus()
        .then(() => {
          if (this.auth.logged && this.auth.accessToken === 'good') {
            this.getSale()
              .then(() => { return this.saleManager.getSaleAvailability(this.saleId) })
              .then((isSaleAvailable: boolean) => {
                return new Promise((resolve) => {
                  if (isSaleAvailable) {
                    this.getBid()
                      .then(() => resolve());
                  }
                  else {
                    this.router.navigate(['/product-unavailable']);
                  }
                });
              })
              .then(() => this.getPriceToPay())
              .then(() => {
                this.checkDeliveryMethod();
                resolve();
              })
              .catch((error: any) => this.errorHandle(error) );
          }
          else {
            sessionStorage.setItem('redirect_after_login', this.location.path());
            this.router.navigate(['/login']);
          }
        });
    });
  }

  protected getSale(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getSaleCall(this.saleId).subscribe({
        next: (sale: Sale) => {
          this.sale = sale;
          resolve();
        },
        error: () => {
          reject('sale');
        }
      });
    })
  }

  private getBid(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_BIDS_AND_SALES).subscribe({
        next: (value: any) => {
          for (const elem of value) {
            if (elem.sale.id === parseInt(this.saleId)) {
              this.bidMapping(elem);
            }
          }
          resolve();
        },
        error: () => {
          reject('bid');
        }
      });
    });
  }

  private getPriceToPay(): Promise<any> {
    return new Promise((resolve) => {

      if (this.bid.counterOfferAmount > 0) {
        this.priceToPay = this.bid.counterOfferAmount;
      }
      else {
        this.priceToPay = this.bid.isAccepted === true ? this.bid.amount : this.sale.product.reservePrice;
      }
      resolve();
    });
  }

  public getUser(user: User): void {
    this.user = user;
  }

  public getRecipient(recipient: Recipient): void {
    this.recipient = recipient;
  }

  private bidMapping(value: any) {
    const tempBid: Bid = new Bid();

    tempBid.id = value.id;
    tempBid.amount = value.amount
    tempBid.counterOfferAmount = value.counterOfferAmount;
    tempBid.isAccepted = value.isAccepted;
    tempBid.isClosed = value.isClosed;

    this.bid = tempBid;
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
          .then(() => sessionStorage.setItem('redirect_after_login', '/checkout/order-summary'));
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
    else if (localStorage.getItem('mondial-relay') === 'true') {
      this.deliveryMethod = 'mondial-relay';

      if (this.isEmpty(localStorage.getItem('relayId')) || this.isEmpty(localStorage.getItem('relayCountry'))) {
        this.router.navigate(['/checkout/delivery-information/mondial-relay-selector']);
      }
      else {
        this.relayId = localStorage.getItem('relayId');
        this.relayCountry = localStorage.getItem('relayCountry');
      }
    }
  }

  private checkRelay(): void {
    if (this.isEmpty(localStorage.getItem('relayId')) || this.isEmpty(localStorage.getItem('relayCountry'))) {
      this.router.navigate(['/checkout/delivery-information/mondial-relay-selector']);
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
