import { NotificationsService } from './notifications.service';
import { SaleRequestService } from './sale-request.service';
import { RequestService } from 'src/app/services/request.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { Sale } from 'src/app/models/sale';
import { Injectable } from '@angular/core';
import { ErrorMessageManagerService } from './error-message-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SaleManagerService {
  constructor(
    private bidManager: BidManagerService,
    private request: RequestService,
    private saleRequest: SaleRequestService,
    private notifications: NotificationsService,
    private errorManager: ErrorMessageManagerService)
  {}

  public isClosed(sale: Sale): boolean {
    return sale.status === 'closed';
  }

  public isAccepted(sale: Sale): boolean {
    return sale.status === 'accepted'
  }

  public hasBids(sale: Sale): boolean {
    return sale.bids.length > 0;
  }

  public hasNonTreatedBids(sale: Sale): boolean {
    for (const bid of sale.bids) {
      if (!this.bidManager.isTreated(bid)) {
        return true;
      }
    }
    return false;
  }

  public hasNonAnsweredQuestions(sale: Sale): boolean {
    for (const question of sale.product.validQuestions) {
      if (!question.answer) {
        return true;
      }
    }
    return false;
  }

  public isOnline(sale: Sale): boolean {
    return sale.status === 'online';
  }

  public isDeleted(sale: Sale): boolean {
    return sale.status === 'deleted';
  }

  public isSold(sale: Sale): boolean {
    return sale.status === 'sold';
  }

  public getSaleAvailability(saleId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_SALE_AVAILABILITY, [saleId.toString()]).subscribe(
        (availability: any) => {
          resolve(availability.isSaleAvailable);
        },
        () => {
          reject('ProductUnavailable');
        }
      );
    });
  }

  public deleteSale(sale: Sale, domId: string): Promise<void> {
    const message: string = "L'annonce a bien été supprimée";
    const classes: string[] = ["is-success"];

    return new Promise((resolve, reject) => {
      this.saleRequest.deleteSale(sale.id).subscribe({
        next: (res: any) => {
          if (res.status === 'deleted') {
            this.notifications.display(message, domId, classes, -1);
            sale.status = 'deleted';
            resolve();
          }
          else {
            this.errorManager.addErrorMessage('Une erreur est survenue');
            reject();
          }
        },
        error: () => {
          this.errorManager.addErrorMessage('Une erreur est survenue');
          reject();
        }
      })
    });
  }

  public sortSalesByLastUpdate(sales: Sale[]): Sale[] {
    return sales.sort((a, b) => {
      const c: number = new Date(a.updatedAt).getTime();
      const d: number = new Date(b.updatedAt).getTime();

      return d - c;
    });
  }
}
