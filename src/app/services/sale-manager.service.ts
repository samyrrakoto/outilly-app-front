import { RequestService } from 'src/app/services/request.service';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { Sale } from 'src/app/models/sale';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleManagerService {

  constructor(public bidManager: BidManagerService, private request: RequestService) { }

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

  public getSaleAvailability(saleId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_SALE_AVAILABILITY, [saleId]).subscribe(
        (availability: any) => {
          resolve(availability.isSaleAvailable);
        },
        () => {
          reject('ProductUnavailable');
        }
      );
    });
  }
}
