import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.css']
})
export class DeliveryInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.mondialRelayWidget();
  }

  public mondialRelayWidget(): void {
    $("#zone_widget").MR_ParcelShopPicker({
        Target: "#data",
        Brand: "BDTEST13",
        Country: "FR"
    });
  };
}
