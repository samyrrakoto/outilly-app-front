import { UserPurchasesComponent } from './../user-purchases.component';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-purchases-confirmed',
  templateUrl: './user-purchases-confirmed.component.html',
  styleUrls: ['./user-purchases-confirmed.component.css']
})
export class UserPurchasesConfirmedComponent extends UserPurchasesComponent implements OnInit {

  constructor(public request: RequestService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public purchaseManager: PurchaseManagerService,
    public bidManager: BidManagerService,
    public location: Location)
  {
    super(request, router, route, auth, purchaseManager, bidManager, location);
  }

  ngOnInit(): void {
  }

}
