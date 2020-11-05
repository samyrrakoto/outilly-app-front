import { Order } from 'src/app/models/order';
import { RequestService } from 'src/app/services/request.service';
import { Component, Input, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { User } from 'src/app/models/user';
import { Bid } from 'src/app/models/bid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-call-to-action',
  templateUrl: './payment-call-to-action.component.html',
  styleUrls: ['../order-summary.component.css', './payment-call-to-action.component.css']
})
export class PaymentCallToActionComponent implements OnInit {
  @Input() areConditionsAccepted: boolean;
  @Input() sale: Sale;
  @Input() user: User;
  @Input() bid: Bid;
  @Input() relayCountry: string;
  @Input() relayId: string;
  @Input() priceToPay: number;
  @Input() deliveryMethod: string;
  errorMessage: string;
  order: Order;

  constructor(public request: RequestService, private router: Router) {
    this.errorMessage = '';
    this.order = new Order();
  }

  ngOnInit(): void {}

  public goPayment() {
    if (this.areConditionsAccepted) {
      this.getPayload();
      this.createOrder()
        .then(() => {
          this.router.navigate(['/checkout/payment-details']);
        })
        .catch((error: any) => {
          this.handleError(error);
        });
    }
    else {
      this.errorMessage = 'Vous devez accepter nos conditions d\'utilisation';
    }
  }

  private getPayload() {
    delete this.order.id;
    this.order.saleId = this.sale.id;
    this.bid.id ? this.order.bidId = this.bid.id : delete this.order.bidId;
    this.order.billingAddressId = this.user.userProfile.addresses[0].id;
    this.order.shippingAddressId = this.order.billingAddressId;
    this.order.amountPrice = this.priceToPay;
    this.order.amountFees = this.priceToPay * 0.06;
    this.order.amountShipment = this.deliveryMethod === 'mondial-relay' ? 690 : 0;
    this.order.amountTotal = this.order.amountPrice + this.order.amountFees + this.order.amountShipment;
    this.order.shipMethod = this.deliveryMethod === 'mondial-relay' ? 'RelayShip' : 'HandDelivery';
    this.order.collMethod = this.deliveryMethod === 'mondial-relay' ? 'RelayPoint' : 'HandDelivery';
    this.deliveryMethod === 'mondial-relay' ? this.order.relayCountry = this.relayCountry : delete this.order.relayCountry;
    this.deliveryMethod === 'mondial-relay' ? this.order.relayPointId = this.relayId : delete this.order.relayPointId;
  }

  private createOrder(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.postData(JSON.stringify(this.order), this.request.uri.CREATE_ORDER).subscribe({
        next: (value: any) => {
          sessionStorage.setItem('orderId', value.body.id);
          resolve();
        },
        error: (err: any) => {
          const existingOrder: RegExp = /INSERT INTO/;
          const errorDetail: string = err.error.detail;

          if (errorDetail && errorDetail.match(existingOrder)) {
            reject('OrderAlreadyCreated');
          }
          else {
            reject('Unknown');
          }
          this.errorMessage = 'Une erreur est survenue ! :-( Veuillez réessayer';
        }
      });
    });
  }

  /*
  ** HANDLING ERRORS
  */
  private handleError(errorName: string='') {
    if (errorName !== '') {
      this['handle' + errorName + 'Error'];
    }
  }

  private handleUknownError(): void {
    console.error('Unknown error');
  }

  private handleOrderAlreadyCreatedError(): void {
    console.log('An order already exists');
  }
}
