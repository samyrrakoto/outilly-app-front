import { RequestService } from 'src/app/services/request.service';
import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { OrderSummaryComponent } from './../order-summary.component';
import { Component, Input, OnInit, resolveForwardRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['../order-summary.component.css', './product-summary.component.css']
})
export class ProductSummaryComponent extends OrderSummaryComponent implements OnInit {
  @Input() priceToPay: number;
  thumbnail: string;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
      super(request, router, auth, location);
      this.thumbnail = '';
    }

  ngOnInit(): any {
    this.getSale()
    .then(() => {
      this.thumbnail = this.getFirstPicture();
    });
  }

  private getFirstPicture(): string {
    for (const media of this.sale.product.productMedias) {
      if (media.type === 'image') {
        return media.path;
      }
    }
  }
}
