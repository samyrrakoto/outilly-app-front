import { UserSalesComponent } from './../user-sales.component';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-sales-confirmed',
  templateUrl: './user-sales-confirmed.component.html',
  styleUrls: ['../../../user-dashboard.component.css', './user-sales-confirmed.component.css']
})
export class UserSalesConfirmedComponent extends UserSalesComponent implements OnInit {
  @Input() isLoaded: boolean;
  public orders: Array<any>;
  @Output() requireActionEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.orders = [];
  }

  ngOnInit(): void {
    this.getOrders()
      .then(() => this.hasRequiredActions());
  }

  private getOrders(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_USER_ORDERS).subscribe(
        (orders: any) =>  {
          this.orders = orders;
          resolve();
        }
      );
    });
  }

  public isDeliveryNoteGenerated(order: any): boolean {
    return order.mrExpedition !== null;
  }

  private hasRequiredActions(): void {
    for (const order of this.orders) {
      if (order.mrExpedition === null) {
        this.requireActionEmitter.emit(true);
        return;
      }
    }
  }
}
