import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;
  @Input() genericQuestions: Array<string>;
  isShortenable: boolean;
  readonly maxVisibleLength: number = 255;

  constructor(public request: RequestService,
    public router: Router,
    route: ActivatedRoute,
    public bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super(request, router, route, bidManager, saleManager, auth);
  }

  ngOnInit(): void {}
}
