import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestService } from 'src/app/services/request.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { UserSalesComponent } from '../user-sales.component';

@Component({
  selector: 'app-user-sales-running',
  templateUrl: './user-sales-running.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', '../user-sales.component.css', './user-sales-running.component.css']
})
export class UserSalesRunningComponent extends UserSalesComponent implements OnInit {
  @Input() sales: Array<Sale>;
  public runningSales: Array<Sale>;
  @Input() isLoaded: boolean;

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location)
  {
    super(request, auth, router, bidManager, saleManager, route, notification, location);
    this.runningSales = [];
  }

  ngOnInit(): void {
    this.getRunningSales();
  }

  private getRunningSales(): void {
    this.request.getData(this.request.uri.GET_SALES_ONLINE).subscribe(
      (sales: any) => this.runningSales = sales
    );
  }
}
