import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mondial-relay-selector',
  templateUrl: './mondial-relay-selector.component.html',
  styleUrls: ['./mondial-relay-selector.component.css']
})
export class MondialRelaySelectorComponent implements OnInit {
  $: any;

  constructor() {}

  ngOnInit(): void {
    this.mondialRelayWidget();
  }

  ngAfterViewChecked(): void {
    window.onload = () => { this.setMRStyle() };
  }

  private setMRStyle(): void {
    const mrWidget: any = document.getElementsByClassName('MR-Widget');
    const mrTitle: any = document.getElementsByClassName('MRW-Title');
    const mrInputs: any = document.getElementsByClassName('MRW-Line');

    this.setMRWidgetStyle(mrWidget[0]);
    this.setMRTitleStyle(mrTitle[0]);
    this.setMRInputsStyle(mrInputs[0]);
    this.setMRButtonsStyle(mrInputs[0]);
  }

  private setMRWidgetStyle(DOMElement: HTMLElement): void {
    DOMElement.style.margin = '0 auto';
    DOMElement.style.fontFamily = 'Arial';
  }

  private setMRTitleStyle(DOMElement: HTMLElement): void {
    DOMElement.style.backgroundColor = 'var(--KTKP-RED)';
    DOMElement.style.color = 'white';
  }

  private setMRInputsStyle(DOMElement: HTMLElement): void {
    const inputs: any = DOMElement.getElementsByTagName('input');

    for (const input of inputs) {
      input.classList.add('input');
    }
  }

  private setMRButtonsStyle(DOMElement: HTMLElement): void {
    const buttons: any = DOMElement.getElementsByTagName('button');

    for (const button of buttons) {
      button.classList.add('button', 'is-small');
    }
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

    localStorage.setItem('relayId', data.value.split('-')[1]);
    localStorage.setItem('relayCountry', data.value.split('-')[0]);
  }
}
