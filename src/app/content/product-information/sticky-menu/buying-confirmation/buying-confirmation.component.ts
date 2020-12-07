import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { Modals } from 'src/app/models/modals';
import { Sale } from 'src/app/models/sale';
import { prices } from 'src/app/parameters';

@Component({
  selector: 'buying-confirmation',
  templateUrl: './buying-confirmation.component.html',
  styleUrls: ['../sticky-menu.component.css', './buying-confirmation.component.css']
})
export class BuyingConfirmationComponent implements OnInit {
  modals: Modals;
  @Input() priceToPay: number;
  @Input() deliveryName: string;
  @Input() deliveryFees: number;
  @Input() sale: Sale;
  securisationFees: number;

  constructor(public sticky: StickyMenuComponent,
    public router: Router) {
    this.sticky.current = 'buyingConfirmation';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
    this.modals = new Modals();
    this.modals.addModal('buyingConfirmation');
  }

  ngOnInit(): void {
    this.securisationFees = this.priceToPay * prices.SECURISATION_FEES_FACTOR > prices.SECURISATION_FEES_MINIMUM
    ? this.priceToPay * prices.SECURISATION_FEES_FACTOR
    : prices.SECURISATION_FEES_MINIMUM;
  }

  public goToCheckout(): void {
    localStorage.setItem('saleId', this.sale.id.toString());

    if (this.deliveryName === 'Mondial Relay') {
      localStorage.setItem('mondial-relay', 'true');
      localStorage.setItem('hand-delivery', 'false');

      this.router.navigate(['/checkout']);
    }
    else if (this.deliveryName === 'Remise en main propre') {
      localStorage.setItem('hand-delivery', 'true');
      localStorage.setItem('mondial-relay', 'false');

      this.router.navigate(['/checkout/order-summary']);
    }
  }
}
