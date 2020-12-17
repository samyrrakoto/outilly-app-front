import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Modals } from 'src/app/models/modals';
import { Bid } from 'src/app/models/bid';
import { Purchase } from 'src/app/models/purchase';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['../../user-dashboard.component.css', './user-purchases.component.css']
})
export class UserPurchasesComponent implements OnInit {
  @Input() purchaseStatus: string;
  @Output() requiresEmitter: EventEmitter<any> = new EventEmitter<any>();
  purchases: Array<Purchase>;
  currentBid: Bid;
  bidderId: number;
  modals: Modals;

  constructor(public request: RequestService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public purchaseManager: PurchaseManagerService,
    public saleManager: SaleManagerService,
    public bidManager: BidManagerService,
    public location: Location,
    public title: Title)
  {
    this.modals = new Modals();
    this.modals.addModal('purchase-explanation');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('declineOffer');
    this.currentBid = new Bid();
    this.purchases = [];
    this.bidderId = 0;
  }

  ngOnInit(): void {
  }

  public createBid(bidId: number): Bid {
    return new Bid(bidId);
  }

  public goToRelayPoint(purchase: Purchase): void {
    localStorage.setItem('saleId', purchase.sale.id.toString());
    this.router.navigate(['/checkout/delivery-information']);
  }

  public goToProductPage(purchase: Purchase): void {
    this.router.navigate(['/product', purchase.slug, purchase.sale.id]);
  }

  public getRunningPurchases(): Purchase[] {
    const purchases: Purchase[] = [];

    for (const purchase of this.purchases) {
      if (purchase.sale.status === 'online') {
        purchases.push(purchase);
      }
    }
    return purchases;
  }
}
