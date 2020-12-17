import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Bid } from 'src/app/models/bid';
import { Sale } from 'src/app/models/sale';
import { Modals } from 'src/app/models/modals';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['../../user-dashboard.component.css', './user-sales.component.css']
})
export class UserSalesComponent implements OnInit {
  public sales: Array<Sale>;
  public currentBid: Bid;
  public currentSale: Sale;
  public counterOfferAmount: number;
  public modals: Modals;
  public isLoaded: boolean;

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public purchaseManager: PurchaseManagerService,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location,
    public title: Title)
  {
    this.sales = [];
    this.currentBid = new Bid();
    this.modals = new Modals();
    this.modals.addModal('declineOffer');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('counterOffer');
    this.modals.addModal('counterOfferConfirmation');
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.auth.getLogStatus()
      .then(() => { return this.checkLogin() })
      .then(() => { this.isLoaded = true });
  }

  private checkLogin(): Promise<any> {
    return this.auth.logged && this.auth.accessToken === 'good' ? Promise.resolve() : Promise.reject();
  }
}
