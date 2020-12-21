import { Sale } from 'src/app/models/sale';
import { Purchase } from 'src/app/models/purchase';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseManagerService {

  constructor(public request: RequestService) {}

  public getPurchases(): Promise<Purchase[]> {
    const request: any = this.request.getData(this.request.uri.GET_BIDS_AND_SALES);
    const purchases: Array<Purchase> = [];

    return new Promise((resolve, reject) => {
      request.subscribe({
        next: (bidsAndSales: any) => {
          console.log(bidsAndSales);
          for (const bidAndSale of bidsAndSales) {
            purchases.push(new Purchase(bidAndSale));
          }
          resolve(purchases);
        },
        error: () => {
          reject();
        }
      });
    });
  }

  public addSales(purchases: Array<Purchase>): Promise<Purchase[]> {
    return new Promise((resolve) => {
      for (const purchase of purchases) {
        this.request.getSaleCall(purchase.sale.id.toString()).subscribe({
          next: (sale: Sale) => {
            purchase.slug = sale.product.slug;
          }
        });
      }
      resolve(purchases);
    });
  }

  public requireAction(purchase: Purchase): boolean {
    if (purchase.isClosed) {
      return true;
    }
  }

  public sortPurchasesByLastUpdate(purchases: Purchase[]): Purchase[] {
    return purchases.sort((a, b) => {
      const c: number = new Date(a.updatedAt).getTime();
      const d: number = new Date(b.updatedAt).getTime();

      return d - c;
    });
  }
}
