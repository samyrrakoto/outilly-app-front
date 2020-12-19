import { UserManagerService } from 'src/app/services/user-manager.service';
import { Bid } from 'src/app/models/bid';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { StickyMenuComponent } from '../sticky-menu.component';

@Component({
  selector: 'delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['../sticky-menu.component.css', './delivery-options.component.css']
})
export class DeliveryOptionsComponent implements OnInit {
  @Input() accessToken: string;
  @Input() sale: Sale;
  @Input() priceToPay: number;
  @Output() priceToPayEmitter: EventEmitter<number> = new EventEmitter<number>();
  bid: Bid;
  deliveryName: string;
  deliveryFees: number;
  errorMsg: string;

  constructor(public request: RequestService,
    public route: ActivatedRoute,
    public auth: AuthService,
    public router: Router,
    public location: Location,
    public sticky: StickyMenuComponent,
    public userManager: UserManagerService,
    public purchaseManager: PurchaseManagerService) {
    this.sticky.current = 'deliveryOptions';
    this.sticky.previous = '';
    this.sticky.next = 'buyingConfirmation';
    this.sticky.nextAlt = 'buyingProposition';
    this.deliveryFees = 0;
    this.deliveryName = '';
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.auth.isLogged() ? this.bid = this.userManager.getBid(this.sale.id) : null;
  }

  public isPending(): boolean {
    return this.bid.isClosed === false;
  }

  public isAccepted(): boolean {
    return this.bid !== null ? this.bid.isAccepted : null;
  }

  public isDeclined(): boolean {
    return this.bid !== null ? this.bid.isAccepted === false : null;
  }

  public isCounterOffer(): boolean {
    return this.bid !== null ? this.bid.counterOfferAmount > 0 : null;
  }

  public nextStep() {
    if (this.sticky.deliveryName !== '') {
      this.sticky.nextStep();
    }
    else {
      this.errorMsg = 'Veuillez choisir votre mode de remise pour passer à l\'étape suivante';
    }
  }

  public nextAltStep() {
    this.sticky.nextAltStep();
  }

  public goToLogin(): void {
    const path: string = this.location.path();

    this.router.navigate(['/login']);
    sessionStorage.setItem('redirect_after_login', path);
  }
}
