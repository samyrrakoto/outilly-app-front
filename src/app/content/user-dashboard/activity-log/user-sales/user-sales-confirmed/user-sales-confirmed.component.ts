import { UserSalesComponent } from './../user-sales.component';
import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
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
export class UserSalesConfirmedComponent extends UserSalesComponent implements OnInit {
  @Input() isLoaded: boolean;
  @Input() sellerOrders: Array<any>;
  modals: Modals;
  currentBuyer: any;
  dispatchNoteA4: string = null;
  dispatchNoteA5: string = null;
  readonly nbAttempts: number = 3;

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
    this.sellerOrders = [];
    this.modals = new Modals();
    this.modals.addModal('buyer-contact');
    this.modals.addModal('etiquette-download');
    this.currentBuyer = {
      'phone1': '',
      'mainAddress': {
        'zipcode': '',
        'city': ''
      }
    };
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

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
}
