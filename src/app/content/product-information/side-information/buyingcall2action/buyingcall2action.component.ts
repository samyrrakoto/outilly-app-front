import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sale } from 'src/app/models/sale';
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
  @Input() mrCosts: number;
  @Input() isAvailable: boolean;
  @Input() priceToPay: number;
  @Output() openState = new EventEmitter<boolean>();
  open: boolean;

  constructor(
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
