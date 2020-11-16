import { CommonModule } from '@angular/common';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivityLogComponent } from '../activity-log.component';
import { Location } from '@angular/common';
import { Bid } from 'src/app/models/bid';
import { Sale } from 'src/app/models/sale';
import { Modals } from 'src/app/models/modals';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['../../user-dashboard.component.css', './user-sales.component.css']
})
export class UserSalesComponent extends ActivityLogComponent implements OnInit {
  @Input() saleStatus: string;
  public sales: Array<Sale>;
  public runningSales: Array<Sale>;
  public currentBid: Bid;
  public counterOfferAmount: number;
  public modals: Modals;
  public isLoaded: boolean;

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location)
  {
    super(request, auth, router, route);
    this.sales = [];
    this.currentBid = new Bid();
    this.modals = new Modals();
    this.modals.addModal('declineOffer');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('counterOffer');
    this.modals.addModal('counterOfferConfirmation');
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.auth.getLogStatus()
      .then(() => { return this.checkLogin() })
      .then(() => { return this.getUrl() })
      .then(() => {
        this.isLoaded = true;
      })
      .catch(() => this.errorHandle() );
  }

  private getUrl(): Promise<any> {
    return new Promise((resolve) => {
      this.route.url.subscribe((url: any) => {
        this.url = url[0].path;

        if (this.url === 'sales') {
          this.setFocus(this.activityTabs, 'user-sales');
        }
        resolve();
      });
    });
  }

  private checkLogin(): Promise<any> {
    return this.auth.logged && this.auth.accessToken === 'good' ? Promise.resolve() : Promise.reject();
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
    const path: string = this.location.path();

    this.router.navigate(['/login']);
    sessionStorage.setItem('redirect_after_login', path);
  }

  public goToProductPage(sale: Sale): void {
    this.router.navigate(['/product', sale.product.slug, sale.id]);
  }
}
