import { BidManagerService } from './../../../bid-manager.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'side-information',
  templateUrl: './side-information.component.html',
  styleUrls: ['./side-information.component.css']
})
export class SideInformationComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;
  @Output() openState = new EventEmitter<boolean>();

  constructor(request: RequestService, route: ActivatedRoute, bidManager: BidManagerService) {
    super(request, route, bidManager);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  emitOpenState(state: boolean) {
    this.openState.emit(state);
  }
}
