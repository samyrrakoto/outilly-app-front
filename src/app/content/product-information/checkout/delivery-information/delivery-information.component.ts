import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.css']
})
export class DeliveryInformationComponent implements OnInit {
  $: any;
  constructor() { }

  ngOnInit(): void {
    this.mondialRelayWidget();
  }

  public mondialRelayWidget(): void {
    // @ts-ignore
    $("#zone_widget").MR_ParcelShopPicker({
        Target: "#data",
        Brand: "BDTEST13",
        Country: "FR"
    });
  };
}
