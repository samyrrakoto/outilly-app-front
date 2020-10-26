import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mondial-relay-selector',
  templateUrl: './mondial-relay-selector.component.html',
  styleUrls: ['./mondial-relay-selector.component.css']
})
export class MondialRelaySelectorComponent implements OnInit {
  $: any;
  mrWidget: HTMLElement;
  isMobileDevice: MediaQueryList = window.matchMedia("(max-width: 768px)");
  displayMondialLogo: boolean;
  mondialLogoSize: string;
  displayCountryLogo: boolean;
  errorMessage: string;

  constructor(public router: Router) {
    this.displayMondialLogo = true;
    this.mondialLogoSize = '50px 50px';
    this.displayCountryLogo = false;
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.loadMondialRelayWidget();
  }

  ngAfterViewChecked(): void {
    this.setMRStyle();
    this.updateMondialRelayWidgetParams();
    this.isMobileDevice.matches ? this.applyMobileStyle() : null;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(event.target.innerWidth <= 768){
      this.applyMobileStyle();
    }
  }

  private setMRStyle(): void {
    const flag: HTMLElement = document.getElementById('Img_Pays');

    this.displayCountryLogo ? null : flag.style.display = 'none';
    this.setMRWidgetStyle();
    this.setMRTitleStyle();
    this.setMRLineStyle();
    this.setMRPRStyle();
    // this.setMRResultsStyle();
  }

  private setMRWidgetStyle(): void {
    this.mrWidget = <HTMLElement>document.getElementsByClassName('MR-Widget')[0];

    this.mrWidget.style.margin = '0 auto';
    this.mrWidget.style.fontFamily = 'Arial';
  }

  private setMRTitleStyle(): void {
    const mrTitle: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Title')[0];

    mrTitle.style.backgroundColor = 'var(--KTKP-GREEN)';
    mrTitle.style.color = 'white';
    mrTitle.style.fontFamily = 'Arial';
    mrTitle.style.fontSize = '1.5em';
  }

  private setMRLineStyle(): void {
    const mrLine: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Line')[0];
    const mondialIcon: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Search')[0];

    this.displayMondialLogo ? mondialIcon.style.backgroundSize = this.mondialLogoSize : mondialIcon.style.backgroundImage = 'none';
    mrLine.style.fontFamily = 'Arial';
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
      inputs[i].style.verticalAlign = 'middle';
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
      buttons[i].style.verticalAlign = 'middle';
    }
  }

  private setMRPRStyle(): void {
    const mrPRNames: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('PR-Name');

    for (let i=0; i<mrPRNames.length; i++) {
    }
  }

  // TODO: find a mean of getting MRW Results when displayed
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

  private applyMobileStyle(): void {
    this.mrWidget.style.width = '100%';

    const mondialIcon: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Search')[0];
    mondialIcon.style.backgroundImage = 'none';

    const map : HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Map')[0];
    map.style.display = 'none';

    const listPR : HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-RList')[0];
    listPR.style.width = '100%';
    listPR.style.maxHeight = 'none';

    // @ts-ignore
    $("#zone_widget").trigger("MR_SetParams",{
      ShowResultsOnMap: false
    });
  }

  // TODO: fix me when I have time
  private applyDesktopStyle(): void {
    this.mrWidget.style.width = '';

    const mondialIcon: HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Search')[0];
    mondialIcon.style.backgroundImage = 'url(https://widget.mondialrelay.com/parcelshop-picker/v4_0/css/imgs/mr-64.png)';

    const map : HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-Map')[0];
    map.style.display = 'contents';

    const listPR : HTMLElement = <HTMLElement>document.getElementsByClassName('MRW-RList')[0];
    listPR.style.width = '230px';
    listPR.style.maxHeight = '';

    // @ts-ignore
    $("#zone_widget").trigger("MR_SetParams",{
      ShowResultsOnMap: true
    });
  }

  /*
  ** MR Widget methods
  */

  private updateMondialRelayWidgetParams(): void {
    // @ts-ignore
    $("#zone_widget").trigger("MR_SetParams",{
      NbResults: 10,
      Responsive: true,
    });
  }

  public loadMondialRelayWidget(): void {
    // @ts-ignore
    $("#zone_widget").MR_ParcelShopPicker({
        Target: "#data",
        Brand: environment.mondialBrand,
        Country: "FR",
    });
  };

  public chooseRelay(): void {
    const data: any = document.getElementById('data');

    localStorage.setItem('relayId', data.value.split('-')[1]);
    localStorage.setItem('relayCountry', data.value.split('-')[0]);

    if (this.isEmpty(localStorage.getItem('relayId'))) {
      this.errorMessage = 'Vous devez choisir un point relais';
    }
    else {
      this.router.navigate(['/checkout/order-summary']);
    }
  }

  private isEmpty(value: any): boolean {
    return [null, 'undefined'].includes(value);
  }
}
