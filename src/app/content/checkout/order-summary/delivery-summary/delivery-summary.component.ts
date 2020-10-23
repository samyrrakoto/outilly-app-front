import { Modals } from './../../../../models/modals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['../order-summary.component.css', './delivery-summary.component.css']
})
export class DeliverySummaryComponent implements OnInit {
  modals: Modals;

  constructor() {
    this.modals = new Modals();
    this.modals.addModal('relayPointPicture');
  }

  ngOnInit(): void {
  }

}
