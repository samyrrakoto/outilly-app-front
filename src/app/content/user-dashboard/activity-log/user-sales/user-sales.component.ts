import { SaleManagerService } from './../../../../sale-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BidManagerService } from './../../../../bid-manager.service';
import { Modals } from './../../../../models/modals';
import { Bid } from './../../../../models/bid';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from './../../../../models/sale';
import { Component, OnInit } from '@angular/core';
import { ActivityLogComponent } from '../activity-log.component';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['../../user-dashboard.component.css', './user-sales.component.css']
})
export class UserSalesComponent extends ActivityLogComponent implements OnInit {
  sales: Array<Sale>;
  currentBid: Bid;
  counterOfferAmount: number;
  modals: Modals;

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    protected route: ActivatedRoute) {
    super(request, auth, router, route);
    this.sales = [];
    this.currentBid = new Bid();
    this.modals = new Modals();
    this.modals.addModal('declineOffer');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('counterOffer');
    this.modals.addModal('counterOfferConfirmation');
  }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      this.url = url[0].path;

      if (this.url === 'sales') {
        this.setFocus(this.activityTabs, 'user-sales');
      }
    });
    this.getUserSales();
  }

  private getUserSalesId(saleId: number): void {
    const request: any = this.request.getData(this.request.uri.SALE, saleId.toString());

    request.subscribe((res) => {
      this.sales.push(res);
    });
  }

  private getUserSales(): void {
    this.request.getData(this.request.uri.GET_USER).subscribe({
      next: (value) => {
        for (const sale of value.sales) {
          this.getUserSalesId(sale.id);
        }
      },
      error: (err) => {
        this.auth.logout();
        this.router.navigate(['/login']);
        sessionStorage.setItem('redirect_after_login', 'user/dashboard/activity-log/sales');

      }
    });
    console.log(this.sales);
  }
}
