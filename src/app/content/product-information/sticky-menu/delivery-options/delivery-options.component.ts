import { Purchase } from 'src/app/models/purchase';
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
  @Input() isSeller: boolean;
  @Input() mrCosts: number;
  @Input() sale: Sale;
  @Input() priceToPay: number;
  @Output() priceToPayEmitter: EventEmitter<number> = new EventEmitter<number>();
  userStatus: string;
  bid: Bid;
  hasBidded: boolean;
  deliveryName: string;
  deliveryFees: number;
  errorMsg: string;

  constructor(
    public request: RequestService,
    public route: ActivatedRoute,
    public auth: AuthService,
    public router: Router,
    public location: Location,
    public sticky: StickyMenuComponent,
    public userManager: UserManagerService,
    public purchaseManager: PurchaseManagerService)
  {
    this.sticky.current = 'deliveryOptions';
    this.sticky.previous = '';
    this.sticky.next = 'buyingConfirmation';
    this.sticky.nextAlt = 'buyingProposition';
    this.deliveryFees = 0;
    this.deliveryName = '';
    this.errorMsg = '';
    this.userStatus = localStorage.getItem('userStatus');
  }

  ngOnInit(): void {
    if (this.auth.isLogged()) {
      this.userManager.getPurchases()
      .then((purchases: Purchase[]) => {
        this.bid = this.userManager.getBid(this.sale.id, purchases);
        if (this.userManager.hasBidded(this.sale.id, purchases)) {
          this.hasBidded = true
        };
      })
    }
  }


  public isPending(): boolean {
    if (this.bid !== null) {
      return this.bid.isClosed === null;
    }
  }

  public isAccepted(): boolean {
    return this.bid.isAccepted;
  }

  public isDeclined(): boolean {
    return this.bid.isAccepted === false && this.bid.counterOfferAmount === null;
  }

  public isCounterOffer(): boolean {
    return this.bid.counterOfferAmount > 0;
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
