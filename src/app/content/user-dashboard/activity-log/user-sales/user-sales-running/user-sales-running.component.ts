import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { RequestService } from 'src/app/services/request.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { UserSalesComponent } from '../user-sales.component';

@Component({
  selector: 'app-user-sales-running',
  templateUrl: './user-sales-running.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', '../user-sales.component.css', './user-sales-running.component.css']
})
export class UserSalesRunningComponent extends UserSalesComponent implements OnInit {
  @Input() runningSales: Array<Sale>;
  @Input() isLoaded: boolean;

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public purchaseManager: PurchaseManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location,
    public title: Title)
  {
    super(request, auth, router, purchaseManager, bidManager, saleManager, route, notification, location, title);
    this.runningSales = [];
  }

  ngOnInit(): void {
  }
}
