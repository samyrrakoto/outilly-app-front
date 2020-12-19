import { prices } from './../../../../parameters';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Recipient } from 'src/app/models/recipient';
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
  @Input() mrCosts: number;
  @Input() sale: Sale;
  @Input() user: User;
  @Input() recipient: Recipient;
  @Input() bid: Bid;
  @Input() relayCountry: string;
  @Input() relayId: string;
  @Input() priceToPay: number;
  @Input() deliveryMethod: string;
  saleId: string;
  errorMessage: string;
  order: Order;

  constructor(public request: RequestService,
    private router: Router,
    public saleManager: SaleManagerService) {
    this.errorMessage = '';
    this.order = new Order();
    this.user = new User();
    this.recipient = new Recipient();
  }

  ngOnInit(): void {
    this.saleId = localStorage.getItem('saleId');
  }

  public goPayment() {
    if (this.areConditionsAccepted) {
      this.getPayload();
      this.saleManager.getSaleAvailability(parseInt(this.saleId))
        .then((isSaleAvailable: boolean) => {
          return new Promise<void>((resolve, reject) => {
            if (isSaleAvailable) {
              this.createOrder();
              resolve();
            }
            else {
              this.router.navigate(['/product-unavailable']);
              reject('product-unavailable');
            }
          });
        })
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
    delete this.order.billingAddressId;
    delete this.order.createdAt;
    delete this.order.updatedAt;
    this.order.saleId = this.sale.id;
    this.bid.id ? this.order.bidId = this.bid.id : delete this.order.bidId;
    this.order.shippingAddressId = this.user.userProfile.mainAddress.id;
    this.order.amountPrice = this.priceToPay;
    this.order.amountFees = this.calculateCommissionFees();
    this.order.amountShipment = this.deliveryMethod === 'mondial-relay' ? this.mrCosts : 0;
    this.order.amountTotal = this.order.amountPrice + this.order.amountFees + this.order.amountShipment;
    this.order.shipMethod = this.deliveryMethod === 'mondial-relay' ? 'RelayShip' : 'HandDelivery';
    this.order.collMethod = this.deliveryMethod === 'mondial-relay' ? 'RelayPoint' : 'HandDelivery';
    this.deliveryMethod === 'mondial-relay' ? this.order.relayCountry = this.relayCountry : delete this.order.relayCountry;
    this.deliveryMethod === 'mondial-relay' ? this.order.relayPointId = this.relayId : delete this.order.relayPointId;
    this.order.recipient = this.recipient;
  }

  private createOrder(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.request.postData(JSON.stringify(this.order), this.request.uri.CREATE_ORDER).subscribe({
        next: (value: any) => {
          sessionStorage.setItem('orderId', value.body.id);
          resolve();
        },
        error: (err: any) => {
          reject('Unknown');
        }
      });
    });
  }

  private calculateCommissionFees(): number {
    return this.priceToPay * prices.SECURISATION_FEES_FACTOR > prices.SECURISATION_FEES_MINIMUM
    ? this.priceToPay * prices.SECURISATION_FEES_FACTOR
    : prices.SECURISATION_FEES_MINIMUM;
  }

  /*
  ** HANDLING ERRORS
  */
  private handleError(errorName: string='') {
    if (errorName !== '') {
      this['handle' + errorName + 'Error'];
    }
  }

  private handleUnknownError(): void {
  }
}
