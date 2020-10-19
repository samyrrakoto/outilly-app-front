import { Component, OnInit } from '@angular/core';

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
    $(document).ready(function () {
      $("#zone_widget").MR_ParcelShopPicker({
          Target: "#data",
          Brand: "BDTEST13",
          Country: "FR"
      });
  });
  }
}
