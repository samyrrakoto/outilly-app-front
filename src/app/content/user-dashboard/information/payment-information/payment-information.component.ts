import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.css']
})
export class PaymentInformationComponent implements OnInit {
  modals: any;

  constructor() {
    this.modals = {
      card: ''
    }
  }

  ngOnInit(): void {
  }

  public openModal(modalName: string): void {
    this.modals[modalName] = 'is-active';
  }

  public closeModal(modalName: string): void {
    this.modals[modalName] = '';
  }
}
