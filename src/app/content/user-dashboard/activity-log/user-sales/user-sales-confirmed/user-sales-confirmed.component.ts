import { wording } from 'src/app/wording';
import { ErrorMessageManagerService } from 'src/app/services/error-message-manager.service';
import { Order } from 'src/app/models/order';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { Modals } from 'src/app/models/modals';
import { Title } from '@angular/platform-browser';
import { OrderManagerService } from 'src/app/services/order-manager.service';
import { DispatchNote } from 'src/app/models/dispatch-note';

@Component({
  selector: 'app-user-sales-confirmed',
  templateUrl: './user-sales-confirmed.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', './user-sales-confirmed.component.css']
})
export class UserSalesConfirmedComponent implements OnInit {
  readonly wording: any = wording.DASHBOARD.ACTIVITY.CONFIRMED_SALES;
  loaded: boolean = false;
  orderSent: boolean = false;
  sellerOrders: Array<any>;
  modals: Modals;
  currentOrder: Order;
  currentBuyer: any;
  dispatchNote: DispatchNote = new DispatchNote();
  typedCode: string = '';
  buyerCodeError: boolean = null;
  errorMessages: ErrorMessageManagerService = new ErrorMessageManagerService();

  constructor(
    public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public purchaseManager: PurchaseManagerService,
    public orderManager: OrderManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location,
    public title: Title)
  {
    this.sellerOrders = [];
    this.modals = new Modals();
    this.modals.addModal('buyer-contact');
    this.modals.addModal('etiquette-download');
    this.modals.addModal('order-availability-confirmation');
    this.modals.addModal('order-delivery-confirmation');
    this.currentBuyer = {
      'phone1': '',
      'mainAddress': {
        'zipcode': '',
        'city': ''
      }
    };
  }

  ngOnInit(): void {
    this.orderManager.getSellerOrders()
      .then((orders: any) => {
        this.sellerOrders = orders;
        this.loaded = true;
      });
  }

  public goToDispatch(order: any): void {
    localStorage.setItem('order', JSON.stringify(order));
    this.router.navigate(['/dispatch-note']);
  }

  public noteAsRead(currentOrder: Order): void {
    if (currentOrder.isReadSeller === false) {
      this.request.patchData(null, this.request.uri.READ_ORDER_SELLER + '/' + currentOrder.id).subscribe(
        () => {
          currentOrder.isReadSeller = true;
          this.notification.confirmedSalesNotifNb--;
          this.notification.allSalesNotifNb--;
        }
      )
    }
  }

  public goToProductPage(productSlug: string, saleId: number): void {
    this.router.navigate(['/product/' + productSlug + '/' + saleId.toString()]);
  }
}
