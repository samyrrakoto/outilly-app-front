import { OrderManagerService } from './../../../../services/order-manager.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { PaymentValidatorService } from 'src/app/services/payment-validator.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { Sale } from 'src/app/models/sale';
import { Title } from '@angular/platform-browser';
import { PageNameManager } from 'src/app/models/page-name-manager';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    responseType: 'text',
    observe: 'response' as 'response'
  };
  cardOwner: string;
  cardNumber: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCvx: string;
  saleId: string;
  orderPrice: number = 0;
  loading: boolean;
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly pageTitle: string = 'Paiement';

  constructor(private request: RequestService,
    private router: Router,
    private auth: AuthService,
    private location: Location,
    private http: HttpClient,
    public paymentValidator: PaymentValidatorService,
    public saleManager: SaleManagerService,
    private orderManager: OrderManagerService,
    private title: Title)
  {
    this.cardOwner = '';
    this.cardNumber = '';
    this.cardExpirationMonth = '';
    this.cardExpirationYear = '';
    this.cardCvx = '';
    this.loading = false;
  }

  ngOnInit(): void {
    this.pageNameManager.setTitle(this.pageTitle);
    this.saleId = localStorage.getItem('saleId');
    this.auth.getLogStatus()
      .then(() => {
        if (this.auth.isLogged()) {
          this.getOrderPriceById(parseInt(sessionStorage.getItem('orderId')));
        }
      });
    this.saleManager.getSaleAvailability(parseInt(this.saleId))
      .then((isAvailable: boolean) => {
        return new Promise<void>((resolve, reject) => {
          if (!isAvailable) {
            reject('ProductUnavailable');
          }
          else {
            resolve();
          }
        });
      })
      .then(() => {
        return new Promise<void>((resolve, reject) => {
          this.auth.logged && this.auth.accessToken === 'good' ? resolve() : reject('Login');
        });
      })
      .then(() => { this.preregister() })
      .catch((error: any) => { this.handleErrors(error) });
  }

  private getOrderPriceById(orderId: number): Promise<void> {
    return new Promise((resolve) => {
      this.orderManager.getOrderById(orderId).subscribe(
        (order: any) => {
          this.orderPrice = order.amountPrice;
          resolve();
        }
      )
    });
  }

  private saveMangoPayData(response: any): void {
    sessionStorage.setItem('cardPreRegistrationData', response.body.mangoPayData.cardPreRegistrationData);
    sessionStorage.setItem('cardRegistrationAccessKey', response.body.mangoPayData.cardRegistrationAccessKey);
    sessionStorage.setItem('cardRegistrationUrl', response.body.mangoPayData.cardRegistrationUrl);
    sessionStorage.setItem('cardRegistrationId', response.body.mangoPayData.cardRegistrationId);
  }

  public checkData(): void {
    const data: any = {
      'cardNumber': this.cardNumber,
      'cardExpirationMonth': this.cardExpirationMonth,
      'cardExpirationYear': this.cardExpirationYear,
      'cardCvx': this.cardCvx
    };

    this.paymentValidator.verify(data);
  }

  public saveCardInformation(): void {
    this.payLineCall()
      .then(() => { return this.updateRegistration() })
      .then(() => { return this.saleManager.getSaleAvailability(parseInt(this.saleId)) })
      .then((isAvailable: boolean) => {
        return new Promise<void>((resolve, reject) => {
          if (!isAvailable) {
            reject('ProductUnavailable');
          }
          else {
            resolve();
          }
        });
      })
      .then(() => { return this.preauth() })
      .catch((error: any) => { this.handleErrors(error) });
  }

  /*
  ** 1 - Preregister
  */
  private preregister(): Promise<void> {
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

  /*
  ** 2 - Call to PayLine
  */
  private payLineCall(): Promise<void> {
    const payload: HttpParams = new HttpParams()
      .set('data', sessionStorage.getItem('cardPreRegistrationData'))
      .set('accessKeyRef', sessionStorage.getItem('cardRegistrationAccessKey'))
      .set('cardNumber', this.cardNumber)
      .set('cardExpirationDate', this.cardExpirationMonth + this.cardExpirationYear)
      .set('cardCvx', this.cardCvx);

    return new Promise((resolve, reject) => {
      this.http.post<any>(sessionStorage.getItem('cardRegistrationUrl'), payload, this.httpOptions).subscribe({
        next: (response: any) => {
          if (response.body.split('=')[0] !== 'data') {
            reject('PayLineCall');
          }
          else {
            sessionStorage.setItem('registrationData', response.body);
            resolve();
          }
        },
        error: (err: any) => {
          reject('PayLineCall');
        }
      });
    });
  }

  /*
  ** 3 - Mango Pay Update Registration Card
  */
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

  /*
  ** 4 - Pre-Authorization
  */
  private preauth(): Promise<void> {
    const payload: any = {
      'type': 'preauth-card',
      'orderId': sessionStorage.getItem('orderId'),
      'cardId': sessionStorage.getItem('cardId')
    };

    return new Promise((resolve, reject) => {

      // If order information are correct
      if (payload.orderId !== null && payload.cardId !== null) {
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
    if (preauthStatus === 'CREATED' && redirectUrl !== null && returnUrl !== null) {
      window.location.href = redirectUrl;
    }
    else if (preauthStatus === 'FAILED') {
      this.router.navigate(['/checkout/payment-failed']);
    }
    else if (preauthStatus === 'SUCCEEDED') {
      this.router.navigate(['/checkout/payment-confirmation']);
    }
  }

  /*
  ** ERROR HANDLING
  */
  private handleErrors(errorName: string): void {
    this['handle' + errorName + 'Error']();
  }

  private handleLoginError(): void {
    const request: any = this.request.getSaleCall(this.saleId).subscribe(
      (sale: Sale) => {
        const path: string = '/product/' + sale.product.slug + '/' + sale.id;

        this.router.navigate(['/login']);
        sessionStorage.setItem('redirect_after_login', path);
      }
    )
  }

  private handlePreRegistrationError(): void {
    const path: string = this.location.path();

    this.router.navigate(['/login']);
    sessionStorage.setItem('redirect_after_login', path);
  }

  private handlePayLineCallError(): void {
  }

  private handleUpdateRegistrationError(): void {
  }

  private handlePreAuthError(): void {
  }

  private handleProductUnavailableError(): void {
    this.router.navigate(['/product-unavailable']);
  }

  private handleOrderMissingError(): void {
    this.router.navigate(['/checkout/order-summary']);
  }
}
