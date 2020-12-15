import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Bid } from 'src/app/models/bid';
import { Sale } from 'src/app/models/sale';
import { Modals } from 'src/app/models/modals';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['../../user-dashboard.component.css', './user-sales.component.css']
})
export class UserSalesComponent implements OnInit {
  @Input() saleStatus: string;
  @Input() runningSales: Array<Sale>;
  @Input() sellerOrders: Array<any>;
  public sales: Array<Sale>;
  public currentBid: Bid;
  public currentSale: Sale;
  public counterOfferAmount: number;
  public modals: Modals;
  public isLoaded: boolean;

  constructor(public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public purchaseManager: PurchaseManagerService,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location,
    public title: Title)
  {
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
      .then(() => { this.isLoaded = true });
  }

  private checkLogin(): Promise<any> {
    return this.auth.logged && this.auth.accessToken === 'good' ? Promise.resolve() : Promise.reject();
  }

  public offerAcceptanceConfirmation(choice: string): void {
    const message: string = "L'offre a bien été acceptée";

    if (choice === 'yes') {
      this.bidManager.acceptOffer(this.currentBid.id);
      this.modals.close('acceptOffer');
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
    }
    else if (choice === 'no') {
      this.modals.close('declineOffer');
    }
  }

  public counterOfferConfirmation(choice: string): void {
    const message: string = 'La contre-offre de ' + this.counterOfferAmount + '€ a bien été réalisée';
    const validation: boolean = this.counterOfferAmount * 100 > this.currentBid.amount && this.counterOfferAmount * 100 < this.currentSale.product.reservePrice;

    if (choice === 'yes') {
      if (validation) {
        this.bidManager.counterOffer(this.currentBid.id, this.counterOfferAmount * 100);
        this.modals.close('counterOfferConfirmation');
        this.modals.close('counterOffer');
      }
      return;
    }
    else if (choice === 'no') {
      this.modals.close('counterOfferConfirmation');
    }
  }

  public checkCounterOfferInput() {
    const realValue: number = this.counterOfferAmount * 100;

    if (realValue > this.currentSale.product.reservePrice) {
      this.counterOfferAmount = (this.currentSale.product.reservePrice / 100) - 1;
    }
    else if (realValue <= this.currentBid.amount) {
      this.counterOfferAmount = (this.currentBid.amount / 100) + 1;
    }
    else {
      this.modals.open('counterOfferConfirmation');
    }
  }

  public counterOfferStatus(): boolean {
    const realValue: number = this.counterOfferAmount * 100;

    return (realValue < this.currentSale.product.reservePrice && realValue > this.currentBid.amount);
  }

  public goToProductPage(slug: string, saleId: number): void {
    this.router.navigate(['/product' + '/' + slug + '/' + saleId.toString()]);
  }
}
