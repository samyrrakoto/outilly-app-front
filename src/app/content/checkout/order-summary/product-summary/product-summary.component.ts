import { RequestService } from 'src/app/services/request.service';
import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { OrderSummaryComponent } from './../order-summary.component';
import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['../order-summary.component.css', './product-summary.component.css']
})
export class ProductSummaryComponent extends OrderSummaryComponent implements OnInit {

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
      super(request, router, auth, location);
    }

  ngOnInit(): any {
    this.getSale();
  }
}
