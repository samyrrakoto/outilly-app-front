import { StickyService } from './../../../../services/sticky.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'buying-call-2-action',
  templateUrl: './buyingcall2action.component.html',
  styleUrls: ['./buyingcall2action.component.css']
})
export class Buyingcall2actionComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;
  @Output() openState = new EventEmitter<boolean>();

  constructor(request: RequestService, route: ActivatedRoute) {
    super(request, route);
  }

  ngOnInit(): void {
  }

  emitOpenState() {
    this.openState.emit(true);
  }
}
