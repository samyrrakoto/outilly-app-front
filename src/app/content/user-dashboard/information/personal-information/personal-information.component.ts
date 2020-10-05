import { DashboardValidatorService } from './../../../../dashboard-validator.service';
import { Address } from 'src/app/models/address';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { RequestService } from './../../../../services/request.service';
import { UserDashboardComponent } from './../../user-dashboard.component';
import { Component, Input, OnInit, ɵɵelementContainerStart } from '@angular/core';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent extends UserDashboardComponent implements OnInit {
  idNames: Array<string>;
  addressFlag: boolean;
  nextIndex: number;
  readonly genders: Array<string> = ['male', 'female', 'other'];
  readonly genderNames: Array<string> = ['Homme', 'Femme', 'Autre'];
  readonly isoCodes: Array<string> = ['FR', 'CH', 'LU', 'BE'];
  readonly countryNames: Array<string> = ['France', 'Suisse', 'Luxembourg', 'Belgique'];
  readonly types: Array<string> = ['individual', 'professionnal'];
  readonly typeNames: Array<string> = ['Particulier', 'Professionnel'];

  constructor(protected request: RequestService, protected auth: AuthService, protected router: Router, public dashboardValidator: DashboardValidatorService) {
    super(request, auth, router);
    this.idNames = [];
    this.addressFlag = false;
    this.nextIndex = 0;
  }

  ngOnInit(): void {
    this.getUserInfos();
  }

  ngAfterViewChecked(): void {
    this.getInputId('input');
  }

  private getInputId(className: string): void {
    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++) {
      this.idNames.push(elements[i].id);
    }
  }

  public getGender(): string {
    let i: number = 0;

    for (const gender of this.genders) {
      if (this.user.userProfile.gender === gender) {
        return this.genderNames[i];
      }
      i++;
    }
    return "not found";
  }

  public getType(): string {
    let i: number = 0;

    for (const type of this.types) {
      if (this.user.userProfile.type === type) {
        return this.typeNames[i];
      }
      i++;
    }
    return "not found";
  }

  public getCountryName(currentIsoCode: string): string {
    let i: number = 0;

    for (const isoCode of this.isoCodes) {
      if (currentIsoCode === isoCode) {
        return this.countryNames[i];
      }
      i++;
    }
    return "not found";
  }

  private displayNotification(duration: number = 3000): void {
    const content: HTMLElement = document.getElementById('content');
    const notif: HTMLDivElement = document.createElement('div');

    notif.classList.add('notification', 'is-success');
    notif.id = 'notification';
    notif.style.marginTop = '20px';
    notif.innerHTML = 'Votre compte a bien été mis à jour !';
    content.appendChild(notif);

    setTimeout(() => { this.removeNotification() }, duration);
  }

  private removeNotification(): void {
    const notif: HTMLElement = document.getElementById('notification');

    notif.remove();
  }

  public updateUserData(): void {
    const payload: any = this.createPayload();

    if (this.dashboardValidator.verify(this.user)) {
      this.request.updateUser(payload).subscribe((res) => {
        console.log(res);
        this.displayNotification();
      });
    }
  }

  public addAddress(): void {
    this.nextIndex = this.user.userProfile.addresses.length;
    this.user.userProfile.addresses.push(new Address());
    this.addressFlag = true;
  }

  public removeAddress(index: number): void {
    this.user.userProfile.addresses.splice(index);
  }

  public updateUserAddress(addressIndex: number): void {
    const addresses: any =
    [{
      "type": "billing",
      "country": {
        "name": this.user.userProfile.addresses[0].country.name,
        "isoCode": this.user.userProfile.addresses[0].country.isoCode
      },
      "city": this.user.userProfile.addresses[0].city,
      "zipcode": this.user.userProfile.addresses[0].zipcode,
      "line1": this.user.userProfile.addresses[0].line1
    }];

    console.log(this.user.userProfile.addresses[addressIndex]);
  }

  private createPayload(): any {
    this.user.userProfile.birthdate = new Date(this.birthdate).getTime() / 1000; // converting into seconds

    const userProfile: any = {
      "id": this.user.userProfile.id,
      "firstname": this.user.userProfile.firstname,
      "lastname": this.user.userProfile.lastname,
      "email": this.user.userProfile.email,
      "emailOptin": this.user.userProfile.emailOptin,
      "phone1": this.user.userProfile.phone1,
      "phone1Optin": this.user.userProfile.phone1Optin,
      "gender": this.user.userProfile.gender,
      "birthdate": this.user.userProfile.birthdate,
      "type": this.user.userProfile.type,
    };

    const user: any = {
      "user": {
        "id": this.user.id,
        "password": this.user.password,
        userProfile
      }
    };
    return user;
  }
}
