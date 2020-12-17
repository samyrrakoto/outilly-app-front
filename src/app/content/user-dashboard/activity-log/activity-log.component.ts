import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { Location } from '@angular/common';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['../user-dashboard.component.css', './activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  readonly activityTabs: Array<string> = ['user-sales', 'user-sales-confirmed', 'user-purchases', 'user-purchases-confirmed'];
  private url: string;
  private currentActivity: string;
  public currentSection: string;
  public saleStatus: string;
  public purchaseStatus: string;

  constructor(
    protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected purchaseManager: PurchaseManagerService,
    protected location: Location,
    protected saleManager: SaleManagerService,
    public notification: NotificationService,
    public title: Title)
  {
    this.currentSection = 'sales';
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getUrl();
    this.currentActivity = this.getCurrentActivity();
    this.setFocus(this.currentActivity);
  }

  private getUrl(): void {
    this.url = this.location.path();
  }

  private getCurrentActivity(): string {
    if (this.url.includes('/sales/confirmed')) {
      return 'user-sales-confirmed';
    }
    else if (this.url.includes('/sales/running')) {
      return 'user-sales';
    }
    else if (this.url.includes('/purchases/confirmed')) {
      return 'user-purchases-confirmed';
    }
    else if (this.url.includes('/purchases/running')) {
      return 'user-purchases';
    }
  }

  public setFocus(id: string): void {
    for (const tab of this.activityTabs) {
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
