import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PaymentValidatorService } from './../../../../services/payment-validator.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  httpOptions: any = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
    observe: 'response' as 'response',
    'Access-Control-Allow-Origin': 'https://homologation-webpayment.payline.com'
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
      this.cardOwner = '';
      this.cardNumber = '';
      this.cardExpirationMonth = '';
      this.cardExpirationYear = '';
      this.cardCvx = '';
    }

  ngOnInit(): void {
    this.preregister();
  }

  private preregister(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.postData(null, this.request.uri.PREREGISTER).subscribe({
        next: (response: any) => {
          console.log(response);
          this.saveMangoPayData(response);
          resolve(response);
        },
        error: () => {
          this.handleError();
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

  private handleError(): void {
    const path: string = this.location.path();

    this.router.navigate(['/login']);
    localStorage.setItem('redirect_after_login', path);
  }

  public payLineCall(): Promise<any> {
    const payload: any = {
      'data': sessionStorage.getItem('cardPreRegistrationData'),
      'accessKeyRef': sessionStorage.getItem('cardRegistrationAccessKey'),
      'cardNumber': this.cardNumber,
      'cardExpirationDate': this.cardExpirationMonth + this.cardExpirationYear,
      'cardCvx': this.cardCvx
    };
    let params: any = "?" + "data=" + payload.data;
    params += "&accessKeyRef=" + payload.accessKeyRef;
    params += "&cardNumber=" + payload.cardNumber;
    params += "&cardExpirationDate=" + payload.cardExpirationDate;
    params += "&cardCvx=" + payload.cardCvx;

    console.log(params);

    return new Promise((resolve, reject) => {
      this.http.get<any>(sessionStorage.getItem('cardRegistrationUrl') + params, this.httpOptions).subscribe({
        next: (response: any) => {
          console.log(response);
          resolve();
        },
        error: (err) => {
          console.log(err);
          reject();
        }
      });
    });
  }
}
