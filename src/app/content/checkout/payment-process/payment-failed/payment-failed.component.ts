import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit {
  public nbTrials: number;

  constructor(private router: Router) {
    this.nbTrials = 4;
  }

  ngOnInit(): void {
  }
}
