import { Purchase } from 'src/app/models/purchase';
import { PurchaseManagerService } from './purchase-manager.service';
import { SaleManagerService } from './sale-manager.service';
import { RequestService } from './request.service';
import { Sale } from 'src/app/models/sale';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  allSales: Sale[];
  runningSales: Sale[];
  runningPurchases: Purchase[];
  allSalesStatus: boolean = false;
  runningSalesStatus: boolean = false;
  runningPurchasesStatus: boolean = false;
  confirmedSalesStatus: boolean = false;
  confirmedPurchasesStatus: boolean = false;

  constructor(
    private request: RequestService,
    private saleManager: SaleManagerService,
    private purchaseManager: PurchaseManagerService)
  {}

  public display(message: string, domId: string, classes: string[] = [], duration: number = 5000): void {
    const content: HTMLElement = document.getElementById(domId);
    const notif: HTMLDivElement = document.createElement('div');

    notif.id = 'notification';
    notif.innerHTML = message;
    content.appendChild(notif);
    this.addClasses(notif, classes);

    if (duration !== -1) {
      setTimeout(() => notif.remove() , duration);
    }
  }

  private addClasses(elem: HTMLDivElement, HtmlClasses: string[]): void {
    for (const HtmlClass of HtmlClasses) {
      elem.classList.add(HtmlClass);
    }
  }

  private getRunningSales(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SALES_ONLINE).subscribe(
        (sales: any) => {
          this.runningSales = sales;
          resolve();
        }
      )
    });
  }

  public getRunningPurchases(): Promise<void> {
    return new Promise((resolve) => {
      this.purchaseManager.getPurchases()
        .then((purchases: Array<Purchase>) => {
          this.runningPurchases = purchases;
          resolve();
        });
    });
  }

  public checkAllNotifications(): void {
    this.checkRunningSalesNotification();
    this.checkRunningPurchasesNotification();
  }

  public checkRunningSalesNotification(): void {
    this.getRunningSales()
      .then(() => {
        for (const sale of this.runningSales) {
          if (this.saleManager.hasNonTreatedBids(sale)) {
            this.runningSalesStatus = true;
            this.allSalesStatus = true;
            return;
          }
        }
      });
  }

  public checkRunningPurchasesNotification(): void {
    this.getRunningPurchases()
      .then(() => {
        for (const purchase of this.runningPurchases) {
          if (this.purchaseManager.requireAction(purchase)) {
            this.runningPurchasesStatus = true;
            this.allSalesStatus = true;
            return;
          }
        }
      });
  }
}
