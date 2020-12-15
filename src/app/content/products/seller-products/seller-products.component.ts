import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  sellerId: number;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
  )
  { }

  ngOnInit(): void {
    this.getSellerId();
  }

  private getSellerId(): Promise<void> {
    return new Promise((resolve) => {
      this.route.params.subscribe(
      (params) => {
        this.sellerId = +params['sellerId'];
        resolve();
      });
    });
  }
}
