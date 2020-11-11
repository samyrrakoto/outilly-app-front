import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'side-information',
  templateUrl: './side-information.component.html',
  styleUrls: ['./side-information.component.css']
})
export class SideInformationComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;
  @Input() isAvailable: boolean;
  @Output() openState = new EventEmitter<boolean>();

  constructor(request: RequestService,
    route: ActivatedRoute,
    router: Router,
    bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService) {
    super(request, router, route, bidManager, saleManager, auth);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  emitOpenState(state: boolean) {
    this.openState.emit(state);
  }
}
