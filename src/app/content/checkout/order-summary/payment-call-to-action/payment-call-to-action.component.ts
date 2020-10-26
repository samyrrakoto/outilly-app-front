import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-call-to-action',
  templateUrl: './payment-call-to-action.component.html',
  styleUrls: ['../order-summary.component.css', './payment-call-to-action.component.css']
})
export class PaymentCallToActionComponent implements OnInit {
  @Input() areConditionsAccepted: boolean;
  errorMessage: string;

  constructor() {
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  public goPayment() {
    if (this.areConditionsAccepted) {
      console.log('On lâche la thune !');
    }
    else {
      this.errorMessage = 'Vous devez accepter nos conditions d\'utilisation';
    }
  }
}
