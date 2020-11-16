import { UserSalesComponent } from './../user-sales.component';
import { Component, Input, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-user-sales-confirmed',
  templateUrl: './user-sales-confirmed.component.html',
  styleUrls: ['../../../user-dashboard.component.css', './user-sales-confirmed.component.css']
})
export class UserSalesConfirmedComponent extends UserSalesComponent implements OnInit {
  @Input() sales: Array<Sale>;
  @Input() isLoaded: boolean;
  public soldSales: Array<Sale>;
  public orders: Array<any>;

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
    this.soldSales = [];
    this.orders = [];
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_USER_ORDERS).subscribe(
        (orders: any) =>  {
          this.orders = orders
          resolve();
        }
      );
    });
  }

  public isDeliveryNoteGenerated(order: any): boolean {
    return order.mrExpedition !== null;
  }
}
