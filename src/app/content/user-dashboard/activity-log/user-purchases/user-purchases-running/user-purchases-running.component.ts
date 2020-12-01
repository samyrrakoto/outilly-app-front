import { UserPurchasesComponent } from './../user-purchases.component';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { Location } from '@angular/common';
import { Purchase } from 'src/app/models/purchase';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'app-user-purchases-running',
  templateUrl: './user-purchases-running.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', './user-purchases-running.component.css']
})
export class UserPurchasesRunningComponent extends UserPurchasesComponent implements OnInit {
  @Input() purchases: Array<Purchase>;

  constructor(public request: RequestService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public purchaseManager: PurchaseManagerService,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public location: Location)
  {
    super(request, router, route, auth, purchaseManager, saleManager, bidManager, location);
    this.purchases = [];
  }
}
