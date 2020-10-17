import { NotificationService } from './../../../../notification.service';
import { SaleManagerService } from './../../../../sale-manager.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BidManagerService } from './../../../../bid-manager.service';
import { Modals } from './../../../../models/modals';
import { Bid } from './../../../../models/bid';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from './../../../../models/sale';
import { Component, OnInit } from '@angular/core';
import { ActivityLogComponent } from '../activity-log.component';
import { Location } from '@angular/common';

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
  mySubscription: any;

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location) {
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

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  private getUserSalesId(saleId: number): void {
    const request: any = this.request.getData(this.request.uri.SALE, saleId.toString());

    request.subscribe((sale: Sale) => {
      this.sales.push(sale);
    });
  }

  private getUserSales(): void {
    this.request.getData(this.request.uri.GET_USER).subscribe({
      next: (value) => {
        for (const sale of value.sales) {
          this.getUserSalesId(sale.id);
        }
      },
      error: () => {
        this.errorHandle();
      }
    });
  }

  public offerAcceptanceConfirmation(choice: string): void {
    const message: string = "L'offre a bien été acceptée";

    if (choice === 'yes') {
      this.bidManager.acceptOffer(this.currentBid.id);
      this.modals.close('acceptOffer');
      this.refresh(message);
    }
    else if (choice === 'no') {
      this.modals.close('acceptOffer');
    }
  }

  public offerDeclinanceConfirmation(choice: string): void {
    const message: string = "L'offre a bien été refusée";

    if (choice === 'yes') {
      this.bidManager.declineOffer(this.currentBid.id);
      this.modals.close('declineOffer');
      this.refresh(message);
    }
    else if (choice === 'no') {
      this.modals.close('declineOffer');
    }
  }

  public counterOfferConfirmation(choice: string): void {
    const message: string = 'La contre-offre de ' + this.counterOfferAmount + '€ a bien été réalisée';

    if (choice === 'yes') {
      this.bidManager.counterOffer(this.currentBid.id, this.counterOfferAmount * 100);
      this.modals.close('counterOfferConfirmation');
      this.modals.close('counterOffer');
      this.refresh(message);
    }
    else if (choice === 'no') {
      this.modals.close('counterOfferConfirmation');
    }
  }

  private refresh(message: string): void {
    this.notification.display(message, 'notifications');
    setTimeout(() => window.location.reload(), 3000);

  }

  private errorHandle(): void {
    this.auth.logout();
    sessionStorage.setItem('redirect_after_login', this.location.path());
    this.router.navigate(['/login']);
  }
}
