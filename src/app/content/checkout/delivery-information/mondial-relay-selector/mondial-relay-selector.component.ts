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
    const flag: HTMLElement = document.getElementById('Img_Pays');

    flag.remove();
    this.setMRWidgetStyle();
    this.setMRTitleStyle();
    this.setMRSearchStyle();
    this.setMRLineStyle();
    this.setMRPRStyle();
    // this.setMRResultsStyle();
  }

  private setMRWidgetStyle(): void {
    const mrWidget: HTMLElement = <HTMLElement>document.getElementsByClassName('MR-Widget')[0];

    mrWidget.style.margin = '0 auto';
    mrWidget.style.fontFamily = 'Arial';
  }

  private setMRTitleStyle(): void {
    const mrTitle: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Title')[0];

    mrTitle.style.backgroundColor = 'var(--KTKP-GREEN)';
    mrTitle.style.color = 'white';
    mrTitle.style.fontFamily = 'Arial';
    mrTitle.style.fontSize = '1.5em';
  }

  private setMRSearchStyle(): void {
    const mondialIcon: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Search')[0];

    // mondialIcon.style.backgroundImage = 'none';
  }

  private setMRLineStyle(): void {
    const mrLine: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Line')[0];

    mrLine.style.verticalAlign = 'middle';
    this.setMRButtonsStyle();
    this.setMRInputsStyle(mrLine);
    this.setMRZipcodeStyle(mrLine);
  }

  private setMRInputsStyle(DOMElement: HTMLElement): void {
    const inputs: HTMLCollectionOf<HTMLInputElement> = DOMElement.getElementsByTagName('input');

    for (let i=0; i<inputs.length; i++) {
      inputs[i].classList.add('input');
      inputs[i].classList.add('is-small');
      inputs[i].style.fontFamily = 'Arial';
    }
  }

  private setMRZipcodeStyle(DOMElement: HTMLElement): void {
    const zipcodeField: HTMLElement = <HTMLElement>DOMElement.getElementsByClassName('Arg2')[0];

    zipcodeField.style.width = '65px';
    zipcodeField.style.fontSize = 'Arial';
  }

  private setMRButtonsStyle(): void {
    const mrLine: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('MRW-Line');
    const buttons: HTMLCollectionOf<HTMLButtonElement> = mrLine[0].getElementsByTagName('button');
    const content: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Content')[0];

    for (let i=0; i<buttons.length; i++) {
      buttons[i].classList.add('button', 'is-small');
      buttons[i].style.fontFamily = 'Arial';
    }
    this.test(content);
  }

  private test(target: HTMLElement): void {
    const observer: MutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        console.log(mutation);
      };
    });
    const config = { attributes: true, childList: true, characterData: true };

    observer.observe(target, config);
    observer.disconnect();
  }

  private setMRPRStyle(): void {
    const mrPRNames: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('PR-Name');

    for (let i=0; i<mrPRNames.length; i++) {
    }
  }

  private setMRResultsStyle(): void {
    const results: HTMLElement = <HTMLElement>document.querySelector('.MRW-Results')[0];

    results.style.backgroundColor = 'var(--KTKP-GREEN)';
    this.setMRMapStyle();
  }

  private setMRMapStyle(): void {
    const map: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Map')[0];

    map.style.margin = '0 auto';
    map.style.float = 'center';
  }

  private setMRList(): void {
    const relayList: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('MRW-RList');

    for (let i=0; i<relayList.length; i++) {
    }
  }

  public mondialRelayWidget(): void {
    // @ts-ignore
    $("#zone_widget").MR_ParcelShopPicker({
        Target: "#data",
        Brand: environment.mondialBrand,
        Country: "FR",
        NbResults: 20,
        ShowResultsOnMap: false
    });
  };

  public chooseRelay(): void {
    const data: any = document.getElementById('data');

    localStorage.setItem('relayId', data.value.split('-')[1]);
    localStorage.setItem('relayCountry', data.value.split('-')[0]);
  }
}
