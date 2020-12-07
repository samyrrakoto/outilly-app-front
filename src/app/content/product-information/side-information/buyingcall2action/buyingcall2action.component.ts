import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'buying-call-2-action',
  templateUrl: './buyingcall2action.component.html',
  styleUrls: ['./buyingcall2action.component.css']
})
export class Buyingcall2actionComponent extends GenericComponent implements OnInit {
  @Input() sale: Sale;
  @Input() isAvailable: boolean;
  @Output() openState = new EventEmitter<boolean>();
  open: boolean;

  constructor(
    request: RequestService,
    router: Router,
    route: ActivatedRoute,
    bidManager: BidManagerService,
    auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super();
    this.open = false;
  }

  ngOnInit(): void {}

  emitOpenState() {
    this.openState.emit(this.open);
  }
}
