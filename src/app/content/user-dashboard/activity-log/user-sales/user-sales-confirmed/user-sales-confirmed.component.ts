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

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public purchaseManager: PurchaseManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location)
  {
    super(request, auth, router, purchaseManager, bidManager, saleManager, route, notification, location);
    this.sellerOrders = [];
    this.modals = new Modals();
    this.modals.addModal('buyer-contact');
    this.currentBuyer = {};
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
}
