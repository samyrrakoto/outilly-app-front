import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { PaymentValidatorService } from './../../../../services/payment-validator.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { Location } from '@angular/common';

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

  constructor(private request: RequestService,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    public paymentValidator: PaymentValidatorService) {
      this.cardOwner = 'Jean Jacques Goldman';
      this.cardNumber = '4970104100876596';
      this.cardExpirationMonth = '09';
      this.cardExpirationYear = '22';
      this.cardCvx = '250';
    }

  ngOnInit(): void {
    this.preregister()
      .catch(() => {});
  }

  private preregister(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.postData(null, this.request.uri.PREREGISTER).subscribe({
        next: (response: any) => {
          this.saveMangoPayData(response);
          resolve(response);
        },
        error: () => {
          this.handlePreRegistration();
          reject();
        }
      });
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
      .then(() => { this.updateRegistration() })
      .then(() => { this.preauth() });
  }

  /*
  ** Call to PayLine
  */
  private payLineCall(): Promise<any> {
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
            this.handlePayLineErrors(response);
            reject();
          }
          else {
            sessionStorage.setItem('registrationData', response.body);
            resolve();
          }
        },
        error: (err) => {
          console.log(err);
          reject();
        }
      });
    });
  }

  /*
  ** Mango Pay Update Registration Card
  */
  private updateRegistration(): Promise<any> {
    const payload: any = {
      'registrationData': sessionStorage.getItem('registrationData')
    };

    return new Promise((resolve, reject) => {
      this.request.postData(payload, this.request.uri.UPDATE_REGISTRATION).subscribe(
        (response) => {
          console.log(response);
          sessionStorage.setItem('cardId', response.body.cardId);
          sessionStorage.removeItem('cardPreRegistrationData');
          sessionStorage.removeItem('cardRegistrationAccessKey');
          sessionStorage.removeItem('cardRegistrationUrl');
          sessionStorage.removeItem('cardRegistrationId');
          sessionStorage.removeItem('registrationData');
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  /*
  ** Pre-Authorization
  */
  private preauth(): Promise<any> {
    const payload: any = {
      'type': 'preauth-card',
      'orderId': sessionStorage.getItem('orderId'),
      'cardId': sessionStorage.getItem('cardId')
    };

    return new Promise((resolve, reject) => {
      this.request.postData(payload, this.request.uri.PREAUTH).subscribe(
        (value) => {
          console.log(value);
          sessionStorage.setItem('mangopayTransactionId', value.body.mangopayTransactionId);
          this.preauthHandle(value);
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  private preauthHandle(value: any): void {
    // for 3D secure payment : brings to a secured page then brings to payment confirmation
    if (value.body.status === 'CREATED' && value.body.redirectUrl !== null && value.body.returnUrl !== null) {
      window.location.href = value.body.redirectUrl;
    }
    else if (value.body.status === 'FAILED') {
      this.paymentValidator.errorMessages.push('Le paiement a échoué');
    }
    else if (value.body.status === 'SUCCEEDED') {
      this.router.navigate(['/checkout/payment-return']);
    }
  }

  /*
  ** ERROR HANDLING
  */
  private handlePreRegistration(): void {
    const path: string = this.location.path();

    this.router.navigate(['/login']);
    sessionStorage.setItem('redirect_after_login', path);
  }

  private handlePayLineErrors(response: any): void {
    const errorType: string = response.body.split('=')[1];

    switch(errorType) {
      case '09101':
        console.error('Incorrect registration data');
        break;
      case '02631':
        console.error('Delay succeeded');
        break;
      default:
        console.error('Unknown error');
        break;
    }
  }
}
