import { RequestService } from './services/request.service';
import { Purchase } from './models/purchase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseManagerService {

  constructor(public request: RequestService) {}

  public getPurchases(): Promise<Purchase[]> {
    const request: any = this.request.getData(this.request.uri.GET_BIDS_AND_SALES);
    const purchases: Array<Purchase> = [];

    return new Promise((resolve) => {
      request.subscribe((res: any) => {
        for (const elem of res) {
          purchases.push(new Purchase(elem));
        }
        resolve(purchases);
      });
    });
  }
}
