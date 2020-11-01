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
  cardOwner: string;
  cardNumber: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCvx: string;

  constructor(private request: RequestService,
    private router: Router,
    private location: Location,
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
    localStorage.setItem('cardPreRegistrationData', response.body.mangoPayData.cardPreRegistrationData);
    localStorage.setItem('cardRegistrationAccessKey', response.body.mangoPayData.cardRegistrationAccessKey);
    localStorage.setItem('cardRegistrationUrl', response.body.mangoPayData.cardRegistrationUrl);
    localStorage.setItem('cardRegistrationId', response.body.mangoPayData.cardRegistrationId);
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
      'date': localStorage.getItem('cardPreRegistrationData'),
      'accessKeyRef': localStorage.getItem('cardRegistrationAccessKey'),
      'cardNumber': this.cardNumber,
      'cardExpirationDate': this.cardExpirationMonth + this.cardExpirationYear,
      'cardCvx': this.cardCvx
    };

    return new Promise((resolve, reject) => {

    });
  }
}
