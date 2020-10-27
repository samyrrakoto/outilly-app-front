import { AuthService } from './../../../../services/auth.service';
import { StickyService } from './../../../../services/sticky.service';
import { Component, OnInit, Input } from '@angular/core';
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
  @Input() isLogged: boolean;
  @Input() accessToken: string;

  constructor(public request: RequestService,
    public route: ActivatedRoute,
    public auth: AuthService,
    public sticky: StickyMenuComponent) {
    super(request, route);
    this.sticky.current = 'deliveryOptions';
    this.sticky.previous = '';
    this.sticky.next = 'buyingConfirmation';
    this.sticky.nextAlt = 'buyingProposition';
    this.isLogged = undefined;
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
