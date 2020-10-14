import { PurchaseManagerService } from './../../../../purchase-manager.service';
import { Purchase } from './../../../../models/purchase';
import { BidManagerService } from './../../../../bid-manager.service';
import { Sale } from './../../../../models/sale';
import { Component, OnInit, Input } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'buying-proposition',
  templateUrl: './buying-proposition.component.html',
  styleUrls: ['../sticky-menu.component.css', './buying-proposition.component.css']
})
export class BuyingPropositionComponent implements OnInit {
  @Input() sale: Sale;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Input() errorMsg: any;
  @Input() proposedPrice: number;
  purchases: Array<Purchase>;
  currentPurchase: Purchase;
  id: number;

  constructor(request: RequestService,
    public route: ActivatedRoute,
    public router: Router,
    public sticky: StickyMenuComponent,
    public bidManager: BidManagerService,
    public purchaseManager: PurchaseManagerService) {
    this.sticky.current = 'buyingProposition';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
    this.sticky.proposedPrice -= 5;
    this.purchases = [];
    this.currentPurchase = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params.id);
    });
    this.purchaseManager.getPurchases()
    .then((purchases: Array<Purchase>) => {
      this.purchases = purchases;
      if (this.hasBidded()) {
        this.currentPurchase = this.getCurrentPurchase();
      }
    })
  }

  public placeBid(amount: number): void {
    this.bidManager.place(amount, this.sale.id);
  }

  public hasBidded(): boolean {
    for (const purchase of this.purchases) {
      if (purchase.saleId === this.id) {
        return true;
      }
    }
    return false;
  }

  private getCurrentPurchase(): Purchase {
    for (const purchase of this.purchases) {
      if (purchase.saleId === this.id) {
        return purchase;
      }
    }
    return null;
  }

  public isAccepted(): boolean {
    return this.currentPurchase.isAccepted;
  }

  public isDeclined(): boolean {
    return this.currentPurchase.isAccepted === false;
  }

  public isAwaiting(): boolean {
    return this.currentPurchase.isAccepted === null && this.currentPurchase.counterOfferAmount === null;
  }

  public hasCounterOffer(): boolean {
    return this.currentPurchase.counterOfferAmount > 0;
  }

  public goToSales(): void {
    this.router.navigate(['/user/dashboard/activity-log/purchases']);
  }
}
