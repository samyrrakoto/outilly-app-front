import { Modals } from './../../../../models/modals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conditions-of-sale',
  templateUrl: './conditions-of-sale.component.html',
  styleUrls: ['../order-summary.component.css', './conditions-of-sale.component.css']
})
export class ConditionsOfSaleComponent implements OnInit {
  modals: Modals;

  constructor() {
    this.modals = new Modals();
    this.modals.addModal('conditions-of-use');
    this.modals.addModal('conditions-of-sale');
  }

  ngOnInit(): void {
  }

}
