import { StickyService } from './../../../../services/sticky.service';
import { Component, OnInit } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInformationComponent } from '../../product-information.component';

@Component({
  selector: 'delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['../sticky-menu.component.css', './delivery-options.component.css']
})
export class DeliveryOptionsComponent extends StickyMenuComponent implements OnInit {

  constructor(request: RequestService, route: ActivatedRoute, public sticky: StickyMenuComponent) {
    super(request, route);
    this.sticky.current = 'deliveryOptions';
    this.sticky.previous = '';
    this.sticky.next = 'buyingConfirmation';
    this.sticky.nextAlt = 'buyingProposition';
  }

  ngOnInit(): void {}

  public nextStep() {
    if (this.deliveryName !== '') {
      this.sticky.nextStep();
    }
  }

  public nextAltStep() {
    if (this.deliveryName !== '') {
      this.sticky.nextAltStep();
    }
  }
}
