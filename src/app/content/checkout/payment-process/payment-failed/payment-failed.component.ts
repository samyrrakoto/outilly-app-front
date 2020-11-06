import { RequestService } from './../../../../services/request.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit {
  public nbAttempts: number;

  constructor(private request: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.getAttempts();
  }

  private getAttempts(): Promise<any> {
    const orderId: string = sessionStorage.getItem('orderId');

    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_ORDER, [orderId.toString()]).subscribe(
        (order) => {
          this.nbAttempts = order.paymentAttempts;
          resolve();
        },
        () => {
          reject();
        }
      );
    });
  }
}
