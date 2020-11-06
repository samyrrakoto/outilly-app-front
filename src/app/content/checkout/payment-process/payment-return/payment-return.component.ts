import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-payment-return',
  templateUrl: './payment-return.component.html',
  styleUrls: ['./payment-return.component.css']
})
export class PaymentReturnComponent implements OnInit {
  private preAuthId: number;
  private transactionId: number;
  paymentStatus: string;
  public errorMessage: string = '';

  constructor(private request: RequestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getTransactionId()
      .then(() => this.getPreauthData());
  }

  private getTransactionId(): Promise<any> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((queryParams: any) => {
        this.preAuthId = queryParams.preAuthorizationId;
        this.transactionId = queryParams.transactionId;
        resolve();
      });
    });
  }

  private getPreauthData(): void {
      this.request.getPreauthData(this.preAuthId).subscribe((res) => {
        if (res.status === 'SUCCEEDED') {
          this.router.navigate(['/checkout/payment-confirmation']);
        } else if (res.status === 'FAILED') {
          this.router.navigate(['checkout/order-summary']);
        } else {
          this.errorMessage = 'Une erreur est survenue, veuillez réessayer';
        }
      });
  }
}
