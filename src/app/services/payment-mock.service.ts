import { Injectable } from '@angular/core';
import { SaleManagerService } from './sale-manager.service';
import { IPaymentService } from './payment.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentMockService implements IPaymentService {
  public saleId: number;
  public cardOwner: string;
  public cardNumber: string;
  public cardExpirationMonth: string;
  public cardExpirationYear: string;
  public cardCvx: string;

  constructor(
    private saleManager: SaleManagerService,
  )
  {}

  public preregister(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  public saveCardInformation(): void {
    this.saleManager.getSaleAvailability(this.saleId)
      .then((isAvailable: boolean) => {
        return new Promise((resolve, reject) => {
          if (!isAvailable)
            reject('ProductUnavailable');
          else
            resolve();
        });
      })
      .catch((error: any) => { this.handleErrors(error) });
  }

  public handleErrors(errorName: string): void {
    this['handle' + errorName + 'Error']();
  }
}
