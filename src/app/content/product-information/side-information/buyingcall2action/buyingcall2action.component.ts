import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'buying-call-2-action',
  templateUrl: './buyingcall2action.component.html',
  styleUrls: ['./buyingcall2action.component.css']
})
export class Buyingcall2actionComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;
  @Output() openState = new EventEmitter<boolean>();
  open: boolean;

  constructor(request: RequestService,
    route: ActivatedRoute,
    bidManager: BidManagerService,
    auth: AuthService) {
    super(request, route, bidManager, auth);
    this.open = false;
  }

  ngOnInit(): void {
  }

  emitOpenState() {
    this.openState.emit(this.open);
  }
}
