import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mondial-relay-selector',
  templateUrl: './mondial-relay-selector.component.html',
  styleUrls: ['./mondial-relay-selector.component.css']
})
export class MondialRelaySelectorComponent implements OnInit {
  $: any;
  relayId: string;
  relayCountry: string;

  constructor() {}

  ngOnInit(): void {
    this.mondialRelayWidget();
  }

  public mondialRelayWidget(): void {
    // @ts-ignore
    $("#zone_widget").MR_ParcelShopPicker({
        Target: "#data",
        Brand: environment.mondialBrand,
        Country: "FR"
    });
  };

  public chooseRelay(): void {
    const data: any = document.getElementById('data');

    this.relayId = data.value.split('-')[1];
    this.relayCountry = data.value.split('-')[0];
    localStorage.setItem('relayId', this.relayId);
    localStorage.setItem('relayCountry', this.relayCountry);
  }
}
