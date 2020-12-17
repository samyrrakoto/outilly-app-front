import { Bid } from 'src/app/models/bid';
import { Modals } from 'src/app/models/modals';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { RequestService } from 'src/app/services/request.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'app-user-sales-running',
  templateUrl: './user-sales-running.component.html',
  styleUrls: ['../../../user-dashboard.component.css', '../../activity-log.component.css', '../user-sales.component.css', './user-sales-running.component.css']
})
export class UserSalesRunningComponent implements OnInit {
  runningSales: Array<Sale>;
  counterOfferAmount: number;
  currentSale: Sale;
  currentBid: Bid;
  loaded: boolean = false;
  modals: Modals = new Modals();

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
    this.modals.addModal('counterOffer');
    this.modals.addModal('counterOfferConfirmation');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('declineOffer');
  }

  ngOnInit(): void {
    this.getRunningSales();
  }

  private getRunningSales(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SALES_ONLINE).subscribe(
        (sales: any) => {
          this.loaded = true;
          this.runningSales = sales;
          console.log(sales);
          resolve();
        }
      );
    });
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
