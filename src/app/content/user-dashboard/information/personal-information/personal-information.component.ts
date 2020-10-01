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

  constructor(protected request: RequestService, protected auth: AuthService, protected router: Router) {
    super(request, auth, router);
    this.idNames = [];
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

  public makeEditable(id: string): void {
    const element: HTMLElement = document.getElementById(id);

    if (element.hasAttribute('readonly')) {
      this.setInputFocus(element, id);
    } else {
      this.unsetInputFocus(element);
    }
  }

  public changeStatus(): void {
    this.user.userProfile.type = this.user.userProfile.type === 'individual' ? 'professional' : 'individual';
  }

  private setInputFocus(element: HTMLElement, id: string): void {
    element.removeAttribute('readonly');
    element.classList.remove('not-editable');
    element.focus();
    this.removeEditable(id);
  }

  private unsetInputFocus(element: HTMLElement): void {
    element.setAttribute('readonly', '');
    element.classList.add('not-editable');
  }

  private removeEditable(currentId: string): void {
    for (const idName of this.idNames) {
      if (idName !== currentId) {
        const currentElement: HTMLElement = document.getElementById(idName);

        currentElement.setAttribute('readonly', '');
        currentElement.classList.add('not-editable');
      }
    }
  }

  public updateUserData(): void {
    const payload: any = this.createPayload();

    this.request.updateUser(payload).subscribe((res) => {
      console.log(res);
    });
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
        "password": this.user.password,
        userProfile
      }
    };
    return user;
  }
}
