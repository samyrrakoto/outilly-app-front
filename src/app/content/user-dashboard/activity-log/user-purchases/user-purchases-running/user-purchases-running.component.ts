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
    public location: Location,
    public title: Title)
  {
    this.runningPurchases = [];
    this.modals.addModal('purchase-explanation');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('declineOffer');
  }

  ngOnInit(): void {
    this.getRunningPurchases();
  }

  public getRunningPurchases(): Promise<void> {
    return new Promise((resolve) => {
      this.purchaseManager.getPurchases()
        .then((purchases: Array<Purchase>) => {
          this.runningPurchases = purchases;
          this.loaded = true;
          resolve();
        });
    });
  }

  public goToProductPage(purchase): void {

  }
}
