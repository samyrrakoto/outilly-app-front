import { MondialRelayManagerService } from 'src/app/services/mondial-relay-manager.service';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { OrderSummaryComponent } from '../order-summary.component';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Bid } from 'src/app/models/bid';
import { Sale } from 'src/app/models/sale';
import { prices } from 'src/app/parameters';

@Component({
  selector: 'app-price-summary',
  templateUrl: './price-summary.component.html',
  styleUrls: ['../order-summary.component.css', './price-summary.component.css']
})
export class PriceSummaryComponent implements OnInit {
  @Input() sale: Sale;
  @Input() mrCosts: number;
  @Input() deliveryMethod: string;
  @Input() bid: Bid;
  @Input() priceToPay: number;
  @Output() priceToPayEvent: EventEmitter<number> = new EventEmitter<number>();
  commissionFees: number;
  deliveryFees: number;
  totalPrice: number;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location,
    public saleManager: SaleManagerService)
  {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['priceToPay'] || changes['mrCosts']) {
      this.getFees();
    }
  }

  private getFees(): void {
    this.commissionFees = this.calculateCommissionFees();
    this.deliveryFees = this.deliveryMethod === 'mondial-relay' ? this.mrCosts : 0;
    this.totalPrice = this.priceToPay + this.commissionFees + this.deliveryFees;
  }

  private calculateCommissionFees(): number {
    return this.priceToPay * prices.SECURISATION_FEES_FACTOR > prices.SECURISATION_FEES_MINIMUM
    ? this.priceToPay * prices.SECURISATION_FEES_FACTOR
    : prices.SECURISATION_FEES_MINIMUM;
  }
}
