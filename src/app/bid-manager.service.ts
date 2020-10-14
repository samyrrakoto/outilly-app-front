import { Sale } from 'src/app/models/sale';
import { Bid } from './models/bid';
import { RequestService } from 'src/app/services/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BidManagerService {
  constructor(public request: RequestService) {}

  public place(amount: number, saleId: number): void {
    const payload: any = {
      "amount": amount,
      "saleId": saleId
    };
    const request: any = this.request.postData(payload, this.request.uri.PLACE_BID);

    request.subscribe((res: any) => {
      console.log(res);
    });
  }

  public acceptOffer(bidId: number): void {
    const payload: any = {
      "bidId": bidId.toString(),
      "isAccepted": true
    };
    const request: any = this.request.putData(this.request.uri.ACCEPT_OFFER, payload);

    request.subscribe((res: any) => {
      console.log(res);
    });
  }

  public declineOffer(bidId: number): void {
    const payload: any = {
      "bidId": bidId.toString(),
      "isAccepted": false
    };
    const request: any = this.request.putData(this.request.uri.DECLINE_OFFER, payload);

    request.subscribe((res: any) => {
      console.log(res);
    });
  }

  public counterOffer(bidId: number, counterOfferAmount: number): void {
    const payload: any = {
      "counterOfferAmount": counterOfferAmount.toString(),
      "bidId": bidId.toString()
    };
    const request: any = this.request.putData(this.request.uri.COUNTER_OFFER, payload);

    request.subscribe((res: any) => {
      console.log(res);
    });
  }

  public isClosed(bid: Bid): boolean {
    return bid.isClosed;
  }

  public isAccepted(bid: Bid): boolean {
    return bid.isAccepted === true;
  }

  public isDeclined(bid: Bid): boolean {
    return bid.isAccepted === false;
  }

  public isCounterOffer(bid: Bid): boolean {
    return bid.counterOfferAmount !== null;
  }

  public isTreated(bid: Bid): boolean {
    return bid.isClosed !== null;
  }

  public sortBidsByAmount(bids: Array<Bid>): Array<Bid> {
    return bids.sort((a,b) => {
      return b.amount - a.amount;
    });
  }
}
