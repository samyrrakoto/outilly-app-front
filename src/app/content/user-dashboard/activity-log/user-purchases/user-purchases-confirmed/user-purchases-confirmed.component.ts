import { UserPurchasesComponent } from './../user-purchases.component';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { Location } from '@angular/common';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'app-user-purchases-confirmed',
  templateUrl: './user-purchases-confirmed.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', './user-purchases-confirmed.component.css']
})
export class UserPurchasesConfirmedComponent extends UserPurchasesComponent implements OnInit {
  public orders: Array<any>;
  public currentOrder: any;

  constructor(public request: RequestService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public purchaseManager: PurchaseManagerService,
    public bidManager: BidManagerService,
    public location: Location)
  {
    super(request, router, route, auth, purchaseManager, bidManager, location);
    this.modals = new Modals();
    this.modals.addModal('order-overview');
    this.currentOrder = null;
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_BUYER_ORDERS).subscribe(
        (orders: any) => {
          this.orders = orders;
          resolve();
        }
      );
    });
  }

  public getCommissionFees(order: any): number {
    return order.amountPrice * 0.06;
  }

  public getShippingFees(order: any): number {
    return order.shipMethod === 'RelayShip' ? 690 : 0;
  }

  public getTotalPrice(order: any): number {
    return order.amountPrice + this.getCommissionFees(order) + this.getShippingFees(order);
  }

  public goToProductPage(order): void {
    this.router.navigate(["/product/" + order.sale.productSlug + "/" + order.sale.id]);
  }
}
