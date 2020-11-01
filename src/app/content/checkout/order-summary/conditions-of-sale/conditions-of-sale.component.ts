import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'app-conditions-of-sale',
  templateUrl: './conditions-of-sale.component.html',
  styleUrls: ['../order-summary.component.css', './conditions-of-sale.component.css']
})
export class ConditionsOfSaleComponent implements OnInit {
  modals: Modals;
  conditionFLag: boolean;
  @Output() areConditionsAccepted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.modals = new Modals();
    this.modals.addModal('conditions-of-use');
    this.modals.addModal('conditions-of-sale');
    this.conditionFLag = false;
  }

  ngOnInit(): void {}

  addNewItem(): void {
    this.conditionFLag = !this.conditionFLag;
    this.areConditionsAccepted.emit(this.conditionFLag);
  }
}
