import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Sale } from 'src/app/models/sale';
import { Purchase } from 'src/app/models/purchase';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { StickyMenuComponent } from '../sticky-menu.component';

@Component({
  selector: 'delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['../sticky-menu.component.css', './delivery-options.component.css']
})
export class DeliveryOptionsComponent implements OnInit {
  @Input() isLogged: boolean;
  @Input() accessToken: string;
  @Input() sale: Sale;
  @Input() priceToPay: number;
  @Output() priceToPayEmitter: EventEmitter<number> = new EventEmitter<number>();
  priceTopay: number;
  id: number;
  purchases: Array<Purchase>;
  currentPurchase: Purchase;
  deliveryName: string;
  deliveryFees: number;
  errorMsg: string;

  constructor(public request: RequestService,
    public route: ActivatedRoute,
    public auth: AuthService,
    public router: Router,
    public location: Location,
    public sticky: StickyMenuComponent,
    public purchaseManager: PurchaseManagerService) {
    this.sticky.current = 'deliveryOptions';
    this.sticky.previous = '';
    this.sticky.next = 'buyingConfirmation';
    this.sticky.nextAlt = 'buyingProposition';
    this.id = 0;
    this.purchases = [];
    this.currentPurchase = null;
    this.priceTopay = 0;
    this.deliveryFees = 0;
    this.deliveryName = '';
    this.errorMsg = '';
  }

  ngOnInit(): void {
    if (this.isLogged && this.accessToken === 'good') {
      this.getId()
        .then(() => this.purchaseManager.getPurchases())
        .then((purchases: Array<Purchase>) => {
          this.purchases = purchases;

          if (this.hasBidded()) {
            this.currentPurchase = this.getCurrentPurchase();
          }

          this.getPriceToPay();
      });
    }
  }

  private getCurrentPurchase(): Purchase {
    for (const purchase of this.purchases) {
      if (purchase.sale.id === this.id) {
        return purchase;
      }
    }
    return null;
  }

  private getId(): Promise<any> {
    return new Promise((resolve) => {
      this.route.params.subscribe(params => {
        this.id = parseInt(params.id);
        resolve();
      });
    });
  }

  private getPriceToPay() {
    if (this.hasBidded()) {
      if (this.currentPurchase.counterOfferAmount > 0) {
        this.priceTopay = this.currentPurchase.counterOfferAmount;
      }
      else if (this.currentPurchase.isAccepted) {
        this.priceTopay = this.currentPurchase.bidAmount;
      }
      else {
        this.priceTopay = this.sale.product.reservePrice;
      }
    }
    else {
      this.priceTopay = this.sale.product.reservePrice;
    }
    this.priceToPayEmitter.emit(this.priceTopay);
  }

  public hasBidded(): boolean {
    for (const purchase of this.purchases) {
      if (purchase.sale.id === this.id) {
        return true;
      }
    }
    return false;
  }

  public isAccepted(): boolean {
    return this.currentPurchase !== null ? this.currentPurchase.isAccepted : null;
  }

  public isDeclined(): boolean {
    return this.currentPurchase !== null ? this.currentPurchase.isAccepted === false : null;
  }

  public isCounterOffer(): boolean {
    return this.currentPurchase !== null ? this.currentPurchase.counterOfferAmount > 0 : null;
  }

  public isPending(): boolean {
    if (this.hasBidded()) {
      return this.currentPurchase.isClosed === null ? true : false;
    }
    return false;
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
