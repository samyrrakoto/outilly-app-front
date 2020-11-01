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
        });
    }
    else {
      this.errorMessage = 'Vous devez accepter nos conditions d\'utilisation';
    }
  }

  private getPayload() {
    this.order.saleId = this.sale.id;
    this.order.bidId = this.bid.id;
    this.order.billingAddressId = this.user.userProfile.addresses[0].id;
    this.order.shippingAddressId = this.order.billingAddressId;
    this.order.relayCountry = this.relayCountry;
    this.order.relayPointId = this.relayId;
    this.order.amountPrice = this.priceToPay;
    this.order.amountFees = this.priceToPay * 0.06;
    this.order.amountShipment = this.deliveryMethod === 'mondial-relay' ? 690 : 0;
    this.order.amountTotal = this.order.amountPrice + this.order.amountFees + this.order.amountShipment;
    this.order.shipMethod = this.deliveryMethod === 'mondial-relay' ? 'RelayShip' : 'HandDelivery';
    this.order.collMethod = this.deliveryMethod === 'mondial-relay' ? 'RelayPoint' : 'HandDelivery';
  }

  private createOrder(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.postData(JSON.stringify(this.order), this.request.uri.CREATE_ORDER).subscribe({
        next: (value: any) => {
          console.log(value);
          resolve();
        },
        error: (err: any) => {
          console.log("Error : " + err);
          reject();
        }
      });
    });
  }
}
