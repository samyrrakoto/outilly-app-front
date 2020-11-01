import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Modals } from 'src/app/models/modals';
import { Bid } from 'src/app/models/bid';
import { ActivityLogComponent } from '../activity-log.component';
import { Purchase } from 'src/app/models/purchase';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['../../user-dashboard.component.css', './user-purchases.component.css']
})
export class UserPurchasesComponent extends ActivityLogComponent implements OnInit {
  modals: Modals;
  purchases: Array<Purchase>;
  currentBid: Bid;
  bidderId: number;

  constructor(public request: RequestService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public purchaseManager: PurchaseManagerService,
    public bidManager: BidManagerService,
    public location: Location) {
    super(request, auth, router, route);
    this.modals = new Modals();
    this.modals.addModal('purchase-explanation');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('declineOffer');
    this.currentBid = new Bid();
    this.purchases = [];
    this.bidderId = 0;
  }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      this.url = url[0].path;

      if (this.url === 'purchases') {
        this.setFocus(this.activityTabs, 'user-purchases');
      }
    });
    this.getPurchases()
      .then((purchases: Array<Purchase>) => {
        this.purchases = purchases;
      });
  }

  private getPurchases(): Promise<Purchase[]> {
    return new Promise((resolve) => {
      this.purchaseManager.getPurchases()
        .then((purchases: Array<Purchase>) => {
          this.purchaseManager.addSales(purchases);
          resolve(purchases);
        })
        .catch(() => { this.errorHandle() })
    })
  }

  private errorHandle(): void {
    sessionStorage.setItem('redirect_after_login', this.location.path());
    this.auth.logout();
  }

  public createBid(bidId: number): Bid {
    return new Bid(bidId);
  }

  public goToRelayPoint(purchase: Purchase): void {
    localStorage.setItem('saleId', purchase.saleId.toString());
    this.router.navigate(['/checkout/delivery-information']);
  }

  public goToProductPage(purchase: Purchase): void {
    this.router.navigate(['/product', purchase.slug, purchase.saleId]);
  }
}
