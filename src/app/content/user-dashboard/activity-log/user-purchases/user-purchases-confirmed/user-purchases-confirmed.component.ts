import { Order } from 'src/app/models/order';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { UserPurchasesComponent } from './../user-purchases.component';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { Location } from '@angular/common';
import { Modals } from 'src/app/models/modals';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-purchases-confirmed',
  templateUrl: './user-purchases-confirmed.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', './user-purchases-confirmed.component.css']
})
export class UserPurchasesConfirmedComponent extends UserPurchasesComponent implements OnInit {
  loading: boolean = false;
  buyerOrders: Array<any>;
  mondialRelayUrl: string = '';
  public currentOrder: any;

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
    super(request, router, route, auth, purchaseManager, saleManager, bidManager, location, title);
    this.modals = new Modals();
    this.modals.addModal('order-overview');
    this.modals.addModal('order-reception')
    this.currentOrder = null;
  }

  ngOnInit(): void {
    this.getBuyerOrders();
  }

  public openMrOrderTracking(orderId: number): void {
    this.loading = true;

    this.request.getData(this.request.uri.MR_ORDER_TRACKING, [orderId.toString()]).subscribe(
      (res: any) => {

        this.mondialRelayUrl = res.tracingLink;
        setTimeout(() => {
          document.getElementById('mondial-relay-url').click();
          this.loading = false;
        }, 200);
      }
    );
  }

  private getBuyerOrders(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_BUYER_ORDERS).subscribe(
        (orders: any) => {
          this.buyerOrders = orders;
          resolve();
        }
      );
    });
  }

  public orderReceptionConfirmation(order: Order): Promise<void> {
    return new Promise((resolve) => {
      this.request.patchData(null, this.request.uri.ORDER_RECEPTION_CONFIRMATION + '/' + order.id.toString()).subscribe(
        () => {
          order.isDelivered = true;
          resolve();
        }
      );
    });
  }

  public getCommissionFees(order: any): number {
    return order.amountFees;
  }

  public getShippingFees(order: any): number {
    return order.amountShipment;
  }

  public getTotalPrice(order: any): number {
    return order.amountTotal;
  }

  public goToProductPage(order: any): void {
    this.router.navigate(["/product/" + order.sale.productSlug + "/" + order.sale.id]);
  }
}
