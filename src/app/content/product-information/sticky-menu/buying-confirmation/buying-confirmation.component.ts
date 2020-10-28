import { Sale } from './../../../../models/sale';
import { Modals } from './../../../../models/modals';
import { Component, OnInit, Input } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public sticky: StickyMenuComponent) {
    this.sticky.current = 'buyingConfirmation';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
    this.modals = new Modals();
    this.modals.addModal('buyingConfirmation');
  }

  ngOnInit(): void {
    this.securisationFees = this.priceToPay * 0.06;
  }
}
