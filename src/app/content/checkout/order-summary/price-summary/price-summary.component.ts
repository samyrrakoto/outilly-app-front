import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { OrderSummaryComponent } from '../order-summary.component';

@Component({
  selector: 'app-price-summary',
  templateUrl: './price-summary.component.html',
  styleUrls: ['../order-summary.component.css', './price-summary.component.css']
})
export class PriceSummaryComponent extends OrderSummaryComponent implements OnInit {
  @Output() priceToPayEvent: EventEmitter<number> = new EventEmitter<number>();
  priceToPay: number;
  commissionFees: number;
  deliveryFees: number;
  totalPrice: number;
  @Input() deliveryMethod: string;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
      super(request, router, auth, location);
    }

  ngOnInit(): any {
    super.ngOnInit()
      .then(() => { this.getPriceToPay() })
      .then(() => {
        this.commissionFees = this.priceToPay * 0.06;
        this.deliveryFees = this.deliveryMethod === 'mondial-relay' ? 690 : 0;
        this.totalPrice = this.priceToPay + this.commissionFees + this.deliveryFees;
      });
  }

  private getPriceToPay(): Promise<any> {
    return new Promise((resolve) => {
      if (this.bid.counterOfferAmount > 0) {
        this.priceToPay = this.bid.counterOfferAmount;
      }
      else {
        if (this.bid.isAccepted) {
          this.priceToPay = this.bid.amount;
        }
        else {
          this.priceToPay = this.sale.product.reservePrice;
        }
      }
      this.priceToPayEvent.emit(this.priceToPay);
      resolve();
    });
  }
}
