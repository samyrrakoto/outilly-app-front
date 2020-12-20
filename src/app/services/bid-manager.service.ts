import { RequestService } from 'src/app/services/request.service';
import { Injectable } from '@angular/core';
import { Bid } from 'src/app/models/bid';

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
    console.log('bid place');
    const request: any = this.request.postData(payload, this.request.uri.PLACE_BID);

    request.subscribe((res: any) => {
    });
  }

  public acceptOffer(bidId: number): void {
    const payload: any = {
      "bidId": bidId.toString(),
      "isAccepted": true
    };
    const request: any = this.request.putData(this.request.uri.ACCEPT_OFFER, payload);

    request.subscribe((res: any) => {
    });
  }

  public declineOffer(bidId: number): void {
    const payload: any = {
      "bidId": bidId.toString(),
      "isAccepted": false
    };
    const request: any = this.request.putData(this.request.uri.DECLINE_OFFER, payload);

    request.subscribe((res: any) => {
    });
  }

  public counterOffer(bidId: number, counterOfferAmount: number): void {
    const payload: any = {
      "counterOfferAmount": counterOfferAmount.toString(),
      "bidId": bidId.toString()
    };
    const request: any = this.request.putData(this.request.uri.COUNTER_OFFER, payload);

    request.subscribe((res: any) => {
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

  public sortBidsByAmount(bids: Array<Bid>, order: string = 'decreasing'): Array<Bid> {
    return bids.sort((a,b) => {
      switch(order) {
        case 'decreasing':
          return b.amount - a.amount;
        case 'increasing':
          return a.amount - b.amount;
      }
    });
  }

  public sortBidsByDate(bids: Array<Bid>, order: string = 'decreasing'): Array<Bid> {
    return bids.sort((a,b) => {
      const c: number = new Date(a.createdAt).getTime();
      const d: number = new Date(b.createdAt).getTime();

      switch(order) {
        case 'decreasing':
          return d - c;
        case 'increasing':
          return c - d;
      }
    });
  }

  public getLatestBid(bids: Array<Bid>): Bid {
    let latestBid: Bid = new Bid();

    for (const bid of bids) {
      if (latestBid.createdAt.getTime() < bid.createdAt.getTime()) {
        latestBid = bid;
      }
    }
    return latestBid;
  }
}
