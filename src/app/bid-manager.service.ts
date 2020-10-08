import { Bid } from './models/bid';
import { RequestService } from 'src/app/services/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BidManagerService {
  bid: Bid;

  constructor(public request: RequestService) {
    this.bid = new Bid();
  }

  public place(amount: number, saleId: number): void {
    const payload: any = {
      "amount": amount,
      "saleId": saleId
    };
    this.request.postData(payload, this.request.uri.PLACE_BID).subscribe((res) => {
      console.log(res);
    });
  }
}
