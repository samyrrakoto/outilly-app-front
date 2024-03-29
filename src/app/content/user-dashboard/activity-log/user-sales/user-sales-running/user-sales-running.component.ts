import { ProductQuestionManagerService, QuestionFilter } from 'src/app/services/product-question-manager.service';
import { UrlService } from 'src/app/services/url.service';
import { questions } from 'src/app/parameters';
import { FormBuilder } from '@angular/forms';
import { Faq } from 'src/app/models/faq';
import { ProductManagerService } from 'src/app/services/product-manager.service';
import { wording } from 'src/app/wording';
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
  readonly wording: any = wording.DASHBOARD.ACTIVITY.RUNNING_SALES;
  readonly maxAnswerLength: number = questions.MAX_ANSWER_LENGTH;
  runningSales: Array<Sale>;
  counterOfferAmount: number;
  currentSale: Sale = new Sale();
  currentBid: Bid;
  currentQuestion: Faq = new Faq();
  currentNotifId: string;
  questionFilter: QuestionFilter = QuestionFilter.ALL;
  answer: string;
  loaded: boolean = false;
  modals: Modals = new Modals();

  constructor(
    public request: RequestService,
    public auth: AuthService,
    public router: Router,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public productQuestionManager: ProductQuestionManagerService,
    public purchaseManager: PurchaseManagerService,
    public productManager: ProductManagerService,
    protected route: ActivatedRoute,
    protected notification: NotificationService,
    protected location: Location,
    public title: Title,
    public formBuilder: FormBuilder,
    public url: UrlService)
  {
    this.modals.addModal('counterOffer');
    this.modals.addModal('counterOfferConfirmation');
    this.modals.addModal('acceptOffer');
    this.modals.addModal('declineOffer');
    this.modals.addModal('answer-question');
    this.modals.addModal('product-questions');
    this.modals.addModal('deletion-confirmation');
  }

  ngOnInit(): void {
    this.getRunningSales()
      .then(() => this.loaded = true);
  }

  private getRunningSales(): Promise<void> {
    return new Promise<void> ((resolve) => {
      this.getRunningOnlineSales()
      .then(() => this.getRunningNewSales())
      .then(() => { resolve() })
    });
  }

  private getRunningOnlineSales(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SALES_ONLINE).subscribe(
        (onlineSales: any) => {
          this.runningSales = onlineSales;
          resolve();
        }
      );
    });
  }

  private getRunningNewSales(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SALES_NEW).subscribe(
        (newSales: any) => {
          this.runningSales = this.runningSales.concat(newSales);
          resolve();
        }
      );
    });
  }

  private findBid(bidId: number): Bid {
    for (const sale of this.runningSales) {
      for (const bid of sale.bids) {
        if (bid.id === bidId) {
          return bid;
        }
      }
    }
    return null;
  }

  public updateBid(bidId: number, status: string, counterOfferAmount?: number): void {
    const bid: Bid = this.findBid(bidId);

    switch(status) {
      case 'accepted':
        bid.isAccepted = true;
        break;
      case 'declined':
        bid.isAccepted = false;
        break;
      case 'counter-offer':
        bid.counterOfferAmount = counterOfferAmount * 100;
        break;
    }
    bid.isClosed = true;
    this.notification.runningSalesNotifNb--;
    this.notification.allSalesNotifNb--;
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

  public getDomId(index: number): string {
    return 'notif' + index.toString();
  }
}
