import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { Location } from '@angular/common';
import { Sale } from 'src/app/models/sale';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['../user-dashboard.component.css', './activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  @Input() url: string;
  readonly activityTabs: Array<string> = ['user-sales', 'user-sales-confirmed', 'user-purchases', 'user-purchases-confirmed'];
  public currentSection: string;
  public saleStatus: string;
  public purchaseStatus: string;
  public purchases: Array<Purchase>;
  public runningSales: Array<Sale>;
  public buyerOrders: Array<any>;
  public sellerOrders: Array<any>;
  public requiresAction: any;

  constructor(protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected purchaseManager: PurchaseManagerService,
    protected location: Location,
    protected saleManager: SaleManagerService,
    public title: Title)
  {
    this.currentSection = 'sales';
    this.saleStatus = 'running';
    this.purchases = [];
    this.requiresAction = {
      'salesConfirmed': false,
      'salesRunning': false,
      'purchasesConfirmed': false,
      'purchasesRunning': false
    };
  }

  ngOnInit(): void {
    this.getPurchases()
      .then(() => this.getRunningSales())
      .then(() => this.getSellerOrders())
      .then(() => this.getBuyerOrders())
      .then(() => this.checkNotifications())
      .then(() => {
      });
  }

  private getPurchases(): Promise<void> {
    return new Promise((resolve) => {
      this.purchaseManager.getPurchases()
        .then((purchases: Array<Purchase>) => {
          this.purchaseManager.addSales(purchases);
          this.purchases = purchases;
          resolve();
        })
        .catch(() => { this.errorHandle() })
    })
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

  private getRunningSales(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SALES_ONLINE).subscribe(
        (sales: any) => {
          this.runningSales = sales;
          resolve();
        }
      );
    });
  }

  private getSellerOrders(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SELLER_ORDERS).subscribe(
        (orders: any) =>  {
          this.sellerOrders = orders;
          resolve();
        }
      );
    });
  }

  private checkNotifications(): void {
    this.checkRunningPurchasesNotification();
    this.checkRunningSalesNotification();
  }

  private checkRunningPurchasesNotification() {
    for (const purchase of this.purchases) {
      if (purchase.isClosed && purchase.sale.status !== 'sold') {
        this.requiresAction['runningPurchases'] = true;
        return;
      }
    }
  }

  private checkRunningSalesNotification() {
    for (const sale of this.runningSales) {
      if (this.saleManager.hasNonTreatedBids(sale)) {
        this.requiresAction['runningSales'] = true;
        return;
      }
    }
  }

  public setFocus(tabs: Array<string>, id: string): void {
    for (const tab of tabs) {
      if (tab !== id) {
        document.getElementById(tab).classList.remove('is-active');
      }
    }

    document.getElementById(id).classList.add('is-active');
  }

  private errorHandle(): void {
    sessionStorage.setItem('redirect_after_login', this.location.path());
    this.auth.logout();
  }

  public goToSales(status: string): void {
    this.currentSection = 'sales';
    this.saleStatus = status;
    this.router.navigate(['/user/dashboard/activity-log/sales']);
  }

  public goToPurchases(status: string): void {
    this.currentSection = 'purchases';
    this.purchaseStatus = status;
    this.router.navigate(['/user/dashboard/activity-log/purchases']);
  }
}
