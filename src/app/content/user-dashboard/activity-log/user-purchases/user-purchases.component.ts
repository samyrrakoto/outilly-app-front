import { Bid } from './../../../../models/bid';
import { Sale } from './../../../../models/sale';
import { PurchaseManagerService } from './../../../../purchase-manager.service';
import { AuthService } from './../../../../services/auth.service';
import { RequestService } from './../../../../services/request.service';
import { Purchase } from './../../../../models/purchase';
import { Modals } from './../../../../models/modals';
import { BidManagerService } from './../../../../bid-manager.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['../../user-dashboard.component.css', './user-purchases.component.css']
})
export class UserPurchasesComponent implements OnInit {
  modals: Modals;
  purchases: Array<Purchase>;
  currentBid: Bid;
  bidderId: number;

  constructor(public request: RequestService, public router: Router, public auth: AuthService, public purchaseManager: PurchaseManagerService, public bidManager: BidManagerService) {
    this.modals = new Modals();
    this.modals.addModal('purchase-explanation');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('declineOffer');
    this.currentBid = new Bid();
    this.purchases = [];
    this.bidderId = 0;
  }

  ngOnInit(): void {
    this.getPurchases();
  }

  private getPurchases() {
    this.purchaseManager.getPurchases()
      .then((purchases: Array<Purchase>) => {
        this.purchases = purchases;
      })
      .catch(() => {
        this.errorHandle();
      });
  }

  private errorHandle(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
    sessionStorage.setItem('redirect_after_login', 'user/dashboard/activity-log/purchases');
  }

  public createBid(bidId: number): Bid {
    return new Bid(bidId);
  }
}
