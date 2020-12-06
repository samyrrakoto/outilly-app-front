import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent extends GenericComponent implements OnInit {
  modals: Modals = new Modals();

  constructor(
    request: RequestService,
    route: ActivatedRoute,
    router: Router,
    bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super();
    this.modals.addModal('localisation');
  }

  ngOnInit(): void {
  }

}
