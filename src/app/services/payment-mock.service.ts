import { Router } from '@angular/router';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
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
    private router: Router,
  )
  {}

  public saveCardInformation(): void {
    this.saleManager.getSaleAvailability(this.saleId)
      .then((isAvailable: boolean) => {
        return new Promise<void>((resolve, reject) => {
          if (!isAvailable)
            reject('ProductUnavailable');
          else
            resolve();
        });
      })
      .then(() => this.router.navigate(['/checkout/payment-confirmation']))
      .catch((error: any) => {
        console.log(error);
        this.handleErrors(error);
      });
  }

  public handleErrors(errorName: string): void {
    this['handle' + errorName + 'Error']();
  }

  private getPrefix(response: any): string {
    return response.body.split('=')[0];
  }
}

interface IPaymentService {
  saleId: number;
  cardOwner: string;
  cardNumber: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCvx: string;
  preregister?(): Promise<void>;
  saveCardInformation(): void;
  handleErrors(errorName: string): void;
}

export { IPaymentService };