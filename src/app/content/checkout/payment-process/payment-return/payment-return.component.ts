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
    this.getTransactionId();
    this.getPreauthData();
  }

  private getTransactionId(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.preAuthId = queryParams.preAuthorizationId;
      this.transactionId = queryParams.transactionId;
      // TODO : remove these when implementing the real ticket
      console.log(this.preAuthId);
      console.log(this.transactionId);
    });
  }

  private getPreauthData(): void {
      this.request.getPreauthData(this.preAuthId).subscribe((res) => {
        //TODO : redirect user to success or failure page depending on res.status;
        if(res.status === 'SUCCEEDED') {
          this.router.navigate(['/checkout/payment-confirmation']);
        } else if (res.status === 'FAILED') {
          this.router.navigate(['checkout/order-summary']);
        } else {
          this.errorMessage = 'Une erreur est survenue, veuillez réessayer';
        }
      });
  }
}
