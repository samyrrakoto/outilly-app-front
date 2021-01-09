import { Order } from 'src/app/models/order';
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
  confirmedSales: Order[];
  confirmedPurchases: Order[];
  allSalesNotifNb: number = 0;
  runningPurchasesNotifNb: number = 0;
  runningSalesNotifNb: number = 0;
  confirmedPurchasesNotifNb: number = 0;
  confirmedSalesNotifNb: number = 0;
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

  ngOnInit(): void {
    this.checkAllNotifications();
  }

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

  private getConfirmedPurchases(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_BUYER_ORDERS).subscribe(
        (orders: any) => {
          this.confirmedPurchases = orders;
          resolve();
        }
      )
    });
  }

  private getConfirmedSales(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_SELLER_ORDERS).subscribe(
        (orders: any) => {
          this.confirmedSales = orders;
          resolve();
        }
      )
    });
  }

  public checkAllNotifications(): void {
    this.allSalesNotifNb = 0;
    this.checkRunningSalesNotification();
    this.checkRunningPurchasesNotification();
    this.checkConfirmedSalesNotification();
    this.checkConfirmedPurchasesNotification();
  }

  public checkRunningSalesNotification(): void {
    this.getRunningSales()
      .then(() => {
        this.runningSalesNotifNb = 0;

        for (const sale of this.runningSales) {
          if (this.saleManager.hasNonTreatedBids(sale)) {
            this.runningSalesNotifNb++;
            this.allSalesNotifNb++;
          }
        }
      });
  }

  public checkRunningPurchasesNotification(): void {
    this.getRunningPurchases()
      .then(() => {
        this.runningPurchasesNotifNb = 0;

        for (const purchase of this.runningPurchases) {
          if (this.purchaseManager.requireAction(purchase) && !purchase.isRead) {
            this.runningPurchasesNotifNb++;
            this.allSalesNotifNb++;
          }
        }
      });
  }

  public checkConfirmedPurchasesNotification(): void {
    this.getConfirmedPurchases()
      .then(() => {
        this.confirmedPurchasesNotifNb = 0;

        for (const purchase of this.confirmedPurchases) {
          if (!purchase.isReadBuyer) {
            this.confirmedPurchasesNotifNb++;
            this.allSalesNotifNb++;
          }
        }
      });
  }
  public checkConfirmedSalesNotification(): void {
    this.getConfirmedSales()
      .then(() => {
        this.confirmedSalesNotifNb = 0;

        for (const order of this.confirmedSales) {
          if ((order.shipMethod === 'RelayShip' && order.mrExpedition === null) || !order.isReadSeller) {
            this.confirmedSalesNotifNb++;
            this.allSalesNotifNb++;
          }
        }
      });
  }
}
