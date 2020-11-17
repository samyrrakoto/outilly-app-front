import { Router, ActivatedRoute } from '@angular/router';
import { UserDashboardComponent } from './../user-dashboard.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['../user-dashboard.component.css', './activity-log.component.css']
})
export class ActivityLogComponent extends UserDashboardComponent implements OnInit {
  readonly activityTabs: Array<string> = ['user-sales', 'user-sales-confirmed', 'user-purchases', 'user-purchases-confirmed'];
  public currentSection: string;
  public saleStatus: string;
  public purchaseStatus: string;
  public requireAction: boolean;

  constructor(protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute) {
      super(request, auth, router);
      this.currentSection = 'sales';
      this.saleStatus = 'running';
      this.requireAction = false;
    }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      this.url = url[0].path;

      if (this.url === 'activity-log') {
        this.setFocus(this.menuTabs, 'activities');
      }
      this.goToSales('running');
    });
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
