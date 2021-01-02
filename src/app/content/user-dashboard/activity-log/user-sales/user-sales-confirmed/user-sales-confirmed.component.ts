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

@Component({
  selector: 'app-user-sales-confirmed',
  templateUrl: './user-sales-confirmed.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', './user-sales-confirmed.component.css']
})
export class UserSalesConfirmedComponent implements OnInit {
  loaded: boolean = false;
  orderSent: boolean = false;
  sellerOrders: Array<any>;
  modals: Modals;
  currentOrder: Order;
  currentBuyer: any;
  dispatchNoteA4: string = null;
  dispatchNoteA5: string = null;
  typedCode: string = '';
  buyerCodeError: boolean = null;
  errorMessages: ErrorMessageManagerService = new ErrorMessageManagerService();
  readonly nbAttempts: number = 3;

  constructor(
    public request: RequestService,
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
    this.getSellerOrders();
  }

  public isDeliveryNoteGenerated(order: any): boolean {
    return order.mrExpedition !== null;
  }

  public isHandDelivery(order: any): boolean {
    return order.shipMethod === 'HandDelivery';
  }

  public isRelayDelivery(order: any): boolean {
    return order.shipMethod === 'RelayShip';
  }

  public isRequiringAction(order: any): boolean {
    if (this.isHandDelivery(order)) {
      return order.isDelivered === null;
    }
    else {
      return !this.isDeliveryNoteGenerated(order);
    }
  }

  public goToDispatch(order: any): void {
    localStorage.setItem('order', JSON.stringify(order));
    this.router.navigate(['/dispatch-note']);
  }

  public generateDispatchNote(order: any, times: number = this.nbAttempts): void {
    const payload: any = {
      'orderId': order.id
    };

    this.request.postData(payload, this.request.uri.GET_DISPATCH_NOTE).subscribe(
      (relayRes: any) => {
        if ((relayRes.body.URL_Etiquette_A4 === null || relayRes.body.URL_Etiquette_A5 === null) && this.nbAttempts > 0) {
          this.generateDispatchNote(order, times--);
        }
        else {
          this.dispatchNoteA4 = relayRes.body.URL_Etiquette_A4;
          this.dispatchNoteA5 = relayRes.body.URL_Etiquette_A5;
        }
        this.modals.open('etiquette-download');
      }
    );
  }

  private getSellerOrders(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SELLER_ORDERS).subscribe(
        (orders: any) =>  {
          this.sellerOrders = orders;
          this.loaded = true;
          resolve();
        }
      );
    });
  }

  public sendOrder(orderId: number): Promise<void> {
    return new Promise((resolve) => {
      this.request.patchData(null, this.request.uri.SEND_ORDER + '/' + orderId.toString()).subscribe(
        () => {
          this.orderSent = true;
          this.currentOrder.isSent = true;
          resolve();
        }
      )
    });
  }

  public availableConfirmation(order: Order): void {
    this.request.patchData(null, this.request.uri.ORDER_VALIDITY_CONFIRMATION + '/' + order.id).subscribe({
      next: () => {
        order.isAvailabilityConfirmed = true;
      },
      error: () => {
        this.errorMessages.addErrorMessage('Une erreur est survenue');
      }
    }
    )
  }

  public checkBuyerCode(order: Order): Promise<boolean> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.CHECK_BUYER_CODE, [order.id.toString(), this.typedCode]).subscribe({
        next: (res: any) => {
          resolve(res.isValid);
        },
        error: () => {
          this.errorMessages.addErrorMessage('Une erreur est survenue');
        }
      })
    });
  }

  public confirmOrderDelivery(order: Order): void {
    this.checkBuyerCode(order)
      .then((isValid: boolean) => {
        if (isValid) {
          order.isBuyerCodeValidated = true;
          this.modals.close('order-delivery-confirmation');
          this.buyerCodeError = false;
        }
        else {
          this.buyerCodeError = true;
        }
      });
  }

  public goToProductPage(productSlug: string, saleId: number): void {
    this.router.navigate(['/product/' + productSlug + '/' + saleId.toString()]);
  }
}
