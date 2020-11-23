import { environment } from 'src/environments/environment';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['../order-summary.component.css', './product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit, OnChanges {
  @Input() sale: Sale;
  @Input() priceToPay: number;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  thumbnail: string;

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
      this.thumbnail = '';
    }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sale']) {
        this.sale = changes['sale'].currentValue;
        this.getFirstPicture();
    }
}

  private getFirstPicture(): void {
    for (const media of this.sale.product.productMedias) {
      if (media.type === 'image') {
        this.thumbnail = this.mediaBaseUri + media.path;
        break;
      }
    }
  }
}
