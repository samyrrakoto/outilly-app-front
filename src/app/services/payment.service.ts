import { Router } from '@angular/router';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements IPaymentService {
  public saleId: number;
  public cardOwner: string;
  public cardNumber: string;
  public cardExpirationMonth: string;
  public cardExpirationYear: string;
  public cardCvx: string;

  constructor(
    private request: RequestService,
    private http: HttpClient,
    private saleManager: SaleManagerService,
    private router: Router,
  )
  {}

  private saveMangoPayData(response: any): void {
    sessionStorage.setItem('cardPreRegistrationData', response.body.mangoPayData.cardPreRegistrationData);
    sessionStorage.setItem('cardRegistrationAccessKey', response.body.mangoPayData.cardRegistrationAccessKey);
    sessionStorage.setItem('cardRegistrationUrl', response.body.mangoPayData.cardRegistrationUrl);
    sessionStorage.setItem('cardRegistrationId', response.body.mangoPayData.cardRegistrationId);
  }

  public preregister(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.request.postData(null, this.request.uri.PREREGISTER).subscribe({
        next: (response: any) => {
          this.saveMangoPayData(response);
          resolve();
        },
        error: () => {
          reject('PreRegistration');
        }
      });
    });
  }

  private payLineCall(): Promise<void> {
    const payload: HttpParams = new HttpParams()
      .set('data', sessionStorage.getItem('cardPreRegistrationData'))
      .set('accessKeyRef', sessionStorage.getItem('cardRegistrationAccessKey'))
      .set('cardNumber', this.cardNumber)
      .set('cardExpirationDate', this.cardExpirationMonth + this.cardExpirationYear)
      .set('cardCvx', this.cardCvx);
    const httpOptions: Record<string, unknown> = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        responseType: 'text',
        observe: 'response' as 'response'
      };

    return new Promise((resolve, reject) => {
      this.http.post<any>(sessionStorage.getItem('cardRegistrationUrl'), payload, httpOptions).subscribe({
        next: (response: any) => {
          if (this.getPrefix(response) !== 'data') {
            console.error('Payline');
            reject('PayLineCall');
          }
          else {
            sessionStorage.setItem('registrationData', response.body);
            resolve();
          }
        },
        error: () => {
          reject('PayLineCall');
        }
      });
    });
  }

  private updateRegistration(): Promise<any> {
    const payload: any = {
      'registrationData': sessionStorage.getItem('registrationData')
    };

    return new Promise<void>((resolve, reject) => {
      this.request.postData(payload, this.request.uri.UPDATE_REGISTRATION).subscribe(
        (response) => {
          sessionStorage.setItem('cardId', response.body.cardId);
          sessionStorage.removeItem('cardPreRegistrationData');
          sessionStorage.removeItem('cardRegistrationAccessKey');
          sessionStorage.removeItem('cardRegistrationUrl');
          sessionStorage.removeItem('cardRegistrationId');
          sessionStorage.removeItem('registrationData');
          resolve();
        },
        () => {
          reject('UpdateRegistration');
        }
      );
    });
  }

  private preauth(): Promise<void> {
    const payload: any = {
      'type': 'preauth-card',
      'orderId': sessionStorage.getItem('orderId'),
      'cardId': sessionStorage.getItem('cardId')
    };

    return new Promise((resolve, reject) => {
      const areOrderInformationCorrect = payload.orderId !== null && payload.cardId !== null;

      if (areOrderInformationCorrect) {
        this.request.postData(payload, this.request.uri.PREAUTH).subscribe({
          next: (value: any) => {
            sessionStorage.setItem('mangopayTransactionId', value.body.mangopayTransactionId);
            this.preauthHandle(value);
            resolve();
          },
          error: () => {
            reject('PreAuth');
          }
        });
      }
      else {
        reject('OrderMissing');
      }
    });
  }

  private preauthHandle(value: any): void {
    const preauthStatus: string = value.body.status;
    const redirectUrl: string = value.body.redirectUrl;
    const returnUrl: string = value.body.returnUrl;

    // for 3D secure payment : brings to a secured page then brings to payment confirmation
    if (preauthStatus === 'CREATED' && redirectUrl !== null && returnUrl !== null)
      window.location.href = redirectUrl;
    else if (preauthStatus === 'FAILED')
      this.router.navigate(['/checkout/payment-failed']);
    else if (preauthStatus === 'SUCCEEDED')
      this.router.navigate(['/checkout/payment-confirmation']);
    else
      this.router.navigate(['/checkout/payment-failed']);
  }

  public saveCardInformation(): void {
    this.payLineCall()
      .then(() => { return this.updateRegistration() })
      .then(() => { return this.saleManager.getSaleAvailability(this.saleId) })
      .then((isAvailable: boolean) => {
        return new Promise<void>((resolve, reject) => {
          if (!isAvailable)
            reject('ProductUnavailable');
          else
            resolve();
        });
      })
      .then(() => { return this.preauth() })
      .catch((error: any) => { this.handleErrors(error) });
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
  preregister(): Promise<void>;
  saveCardInformation(): void;
  handleErrors(errorName: string): void;
}

export { IPaymentService };