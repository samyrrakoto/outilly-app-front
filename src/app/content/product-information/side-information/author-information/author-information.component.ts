import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'author-information',
  templateUrl: './author-information.component.html',
  styleUrls: ['../../product-information.component.css', './author-information.component.css']
})
export class AuthorInformationComponent extends GenericComponent implements OnInit {
  @Input() sale: Sale;
  vendorProducts: string;

  constructor(
    request: RequestService,
    router: Router,
    route: ActivatedRoute,
    bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super();
  }

  ngOnInit(): void {
  }

}
