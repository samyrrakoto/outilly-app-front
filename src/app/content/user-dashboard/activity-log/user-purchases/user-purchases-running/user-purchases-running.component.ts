import { NotificationService } from 'src/app/services/notification.service';
import { Bid } from 'src/app/models/bid';
import { Modals } from 'src/app/models/modals';
import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { Location } from '@angular/common';
import { Purchase } from 'src/app/models/purchase';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-purchases-running',
  templateUrl: './user-purchases-running.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', './user-purchases-running.component.css']
})
export class UserPurchasesRunningComponent {
  loaded: boolean = false;
  runningPurchases: Array<Purchase>;
  modals: Modals = new Modals();
  currentBid: Bid;

  constructor(
    public request: RequestService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public purchaseManager: PurchaseManagerService,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    private notification: NotificationService,
    public location: Location,
    public title: Title)
  {
    this.runningPurchases = [];
    this.modals.addModal('purchase-explanation');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('declineOffer');
  }

  ngOnInit(): void {
    this.getRunningPurchases()
      .then(() => this.loaded = true);
  }

  public getRunningPurchases(): Promise<void> {
    return new Promise((resolve) => {
      this.purchaseManager.getPurchases()
        .then((purchases: Array<Purchase>) => {
          this.runningPurchases = purchases;
          resolve();
        });
    });
  }

  public goToProductPage(purchase: Purchase): void {
    this.router.navigate(['/product/' + purchase.sale.productSlug + '/' + purchase.sale.id]);
  }

  public noteAsRead(currentPurchase: Purchase): void {
    if (currentPurchase.isRead === false) {
      this.request.patchData(null, this.request.uri.READ_BID + currentPurchase.bidId).subscribe(
        () => {
          for (const purchase of this.runningPurchases) {
            if (currentPurchase.bidId === purchase.bidId) {
              currentPurchase.isRead = true;
            }
          }
          this.notification.runningPurchasesNotifNb--;
          this.notification.allSalesNotifNb--;
        }
      )
    }
  }
}
