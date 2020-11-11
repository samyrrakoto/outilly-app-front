import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent extends ProductInformationComponent implements OnInit {

  constructor(request: RequestService,
    route: ActivatedRoute,
    router: Router,
    bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService) {
    super(request, router, route, bidManager, saleManager, auth);
  }

  ngOnInit(): void {
  }

}
