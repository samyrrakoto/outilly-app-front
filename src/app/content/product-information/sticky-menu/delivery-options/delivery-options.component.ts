import { Purchase } from './../../../../models/purchase';
import { PurchaseManagerService } from './../../../../purchase-manager.service';
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
  priceTopay: number;
  id: number;
  purchases: Array<Purchase>;
  currentPurchase: Purchase;

  constructor(public request: RequestService,
    public route: ActivatedRoute,
    public auth: AuthService,
    public sticky: StickyMenuComponent,
    public purchaseManager: PurchaseManagerService) {
    super(request, route);
    this.sticky.current = 'deliveryOptions';
    this.sticky.previous = '';
    this.sticky.next = 'buyingConfirmation';
    this.sticky.nextAlt = 'buyingProposition';
    this.isLogged = undefined;
    this.id = 0;
    this.purchases = [];
    this.currentPurchase = null;
    this.priceTopay = 0;
  }

  ngOnInit(): void {
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

  private getCurrentPurchase(): Purchase {
    for (const purchase of this.purchases) {
      if (purchase.saleId === this.id) {
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
  }

  public hasBidded(): boolean {
    for (const purchase of this.purchases) {
      if (purchase.saleId === this.id) {
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
