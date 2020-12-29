import { UserManagerService } from 'src/app/services/user-manager.service';
import { DashboardValidatorService } from 'src/app/services/dashboard-validator.service';
import { Address } from 'src/app/models/address';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Modals } from 'src/app/models/modals';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  idNames: Array<string>;
  nextIndex: number;
  user: User;
  @Input() birthdate: string;
  readonly genders: Array<string> = ['male', 'female', 'other'];
  readonly genderNames: Array<string> = ['Homme', 'Femme', 'Autre'];
  readonly isoCodes: Array<string> = ['FR', 'CH', 'LU', 'BE'];
  readonly countryNames: Array<string> = ['France', 'Suisse', 'Luxembourg', 'Belgique'];
  readonly types: Array<string> = ['individual', 'professionnal'];
  readonly typeNames: Array<string> = ['Particulier', 'Professionnel'];
  modals: Modals;
  addressIndexToDelete: number;
  idMedias: Array<any>;

  constructor(
    protected request: RequestService,
    public userManager: UserManagerService,
    protected auth: AuthService,
    protected router: Router,
    public dashboardValidator: DashboardValidatorService,
    public notification: NotificationService,
    public route: ActivatedRoute,
    public title: Title)
  {
    this.idNames = [];
    this.nextIndex = 0;
    this.modals = new Modals();
    this.modals.addModal('id');
    this.modals.addModal('addressDeletion');
    this.modals.addModal('dataChanges');
    this.addressIndexToDelete = 0;
    this.idMedias = [];
  }

  ngOnInit(): void {
    this.user = this.userManager.user;
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

  public updateUserData(): void {
    const payload: any = this.createPayload();

    if (this.dashboardValidator.verify(this.user)) {
      this.request.updateUser(payload).subscribe({
        next: () => {
          this.notification.display('Vos information de contact ont bien été modifiées', 'contact-information');
        },
        error: () => {
          this.notification.display('Une erreur est survenue', 'contact-information', ['is-danger']);
        }
      })
    }
  }

  public addAddress(): void {
    this.nextIndex = this.user.userProfile.addresses.length;
    const payload: any = {
      "address": {
        "name": "Travail",
        "type": "billing",
        "line1": "7 rue Bourgneuf",
        "line2": "",
        "line4": "",
        "zipcode": "92160",
        "city": "Antony",
        "region": "Haut de Seine",
        "country": {
            "isocode": "FR"
        }
      }
    };
    this.request.postData(payload, this.request.uri.ADD_ADDRESS).subscribe((res) => {
      this.user.userProfile.addresses.push(new Address(res.body.id));
    });
  }

  public removeAddress(index: number): void {
    const addressIndex: number = this.user.userProfile.addresses[index].id;

    this.request.deleteData(this.request.uri.DELETE_ADDRESS, this.user.userProfile.addresses, [addressIndex.toString()]).subscribe((res) => {
      this.user.userProfile.addresses.splice(index, 1);
    });
  }

  public updateUserAddress(index: number): void {
    const addressId: number = this.user.userProfile.addresses[index].id;
    const payload: any =
    {
      "address" : {
        "id": addressId,
        "name": this.user.userProfile.addresses[index].name,
        "type": "billing",
        "country": {
          "name": this.user.userProfile.addresses[index].country.name,
          "isocode": this.user.userProfile.addresses[index].country.isoCode
        },
        "city": this.user.userProfile.addresses[index].city,
        "zipcode": this.user.userProfile.addresses[index].zipcode,
        "line1": this.user.userProfile.addresses[index].line1
      }
    };

    this.request.putData(this.request.uri.UPDATE_ADDRESS, payload).subscribe({
      next: () => {
        this.notification.display('L\'adresse a bien été modifiée', 'address-' + index, ['notification', 'is-success']);
      },
      error: () => {
        this.notification.display('Une erreur est survenue', 'addresses', ['notification', 'is-danger']);
      }
    })
  }

  public updateUserPwd(): void {
    const errorMessage: string = 'Les nouveaux mots de passe ne correspondent pas';
    const payload: any = {
      currentPwd: this.user.password,
      newPwd: this.user.newPassword
    };

    if (this.user.newPassword !== this.user.passwordConfirmation) {
      this.notification.display(errorMessage, 'security', ['declined']);
      return;
    }
    this.dashboardValidator.removeErrorMsg(errorMessage);
    this.request.putData(this.request.uri.UPDATE_PWD, payload).subscribe({
      next: () => {
        this.notification.display('Votre mot de passe a bien été mis à jour !', 'security', ['accepted']);
      },
      error: () => {
        this.notification.display('Le mot de passe actuel est différent de celui que vous venez d\'indiquer', 'security', ['declined']);
      }
    });
  }

  private createPayload(): any {
    this.user.userProfile.birthdate = parseInt(this.birthdate); // converting into seconds

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

  protected userMapping(userRes: any): void {
    this.user.id = userRes.id;
    this.user.username = userRes.username;
    this.user.userProfile.id = userRes.userProfile.id;
    this.user.userProfile.firstname = userRes.userProfile.firstname;
    this.user.userProfile.lastname = userRes.userProfile.lastname;
    this.birthdateMapping(userRes);
    this.user.userProfile.gender = userRes.userProfile.gender;
    this.user.userProfile.type = userRes.userProfile.type;
    this.user.userProfile.company = userRes.userProfile.company;
    this.addressesMapping(userRes);
    this.user.userProfile.email = userRes.userProfile.email;
    this.user.userProfile.phone1 = userRes.userProfile.phone1;
    this.user.userProfile.phone1Optin = userRes.userProfile.phone1Optin;
    this.user.userProfile.phone2 = userRes.userProfile.phone2;
  }

  private birthdateMapping(userRes: any): void {
    const userBirthdate: any = userRes.userProfile.birthdate *= 1000; // converting into milliseconds
    const day: any = new Date(userBirthdate).getDate() < 10 ? '0' + new Date(userBirthdate).getDate() : new Date(userBirthdate).getDate();
    const month: any = new Date(userBirthdate).getMonth() + 1 < 10 ? '0' + (new Date(userBirthdate).getMonth() + 1) : (new Date(userBirthdate).getMonth() + 1);
    const year: any = new Date(userBirthdate).getFullYear()

    this.birthdate = year + '-' + month + '-' + day;
  }

  private addressesMapping(userRes: any): void {
    let i: number = 0;

    for (const address of userRes.userProfile.addresses) {
      this.user.userProfile.addresses.push(new Address());
      this.user.userProfile.addresses[i] = address;
      i++;
    }
  }

  /*
  ** -- File management
  */
  public handleFile(): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('product-pictures')).files;
    const formData: FormData = this.getFormData(files);

    this.addMedia(files[0]);
    // this.sendMedia(formData);
    this.displayPreview(files[0]);
  }

  public openImgPicker(): void {
    const fileElem = document.getElementById("product-pictures");

    fileElem.click();
  }

  private getFormData(files: FileList): FormData {
    const formData: FormData = new FormData();

    formData.append('productId', localStorage.getItem('id'));
    formData.append('productStrId', localStorage.getItem('strId'));
    formData.append('mediaFile', files.item(0), files.item(0).name);

    return formData;
  }

  private addMedia(file: File): void {
    this.idMedias.push();
  }

  private displayPreview(file: File): void {
    const reader: FileReader = new FileReader();
    const img: any = this.constructPreview(file);

    reader.onload = function (e) { img.src = reader.result; }
    reader.readAsDataURL(file);
  }

  private constructPreview(file: File): any {
    const medias: HTMLElement = document.getElementById("documents");
    const img: any = this.constructImg(file);
    const levels: HTMLElement = this.constructLevels(img);

    medias.appendChild(levels);
    return img;
  }

  private constructImg(file: File): any {
    const img: any = document.createElement("img");

    img.classList.add("previews");
    img.file = file;
    img.style.width = "250px";
    img.style.margin = "auto";
    img.style.border = "solid 3px var(--KTKP-GREEN)";
    return img;
  }

  private constructLevels(img: any): HTMLElement {
    const levels: HTMLElement = document.createElement("nav");
    const leftLevel: HTMLElement = document.createElement("div");
    const rightLevel: HTMLElement = document.createElement("div");
    const btn: HTMLElement = document.createElement("button");

    leftLevel.appendChild(img);
    leftLevel.classList.add("level-left");

    btn.classList.add("button", "has-background-black", "has-text-white");
    btn.innerHTML = "x";
    btn.addEventListener('click', () => this.removeMedia(img.file.name));
    rightLevel.appendChild(btn);
    rightLevel.classList.add("level-right");

    levels.appendChild(leftLevel);
    levels.appendChild(rightLevel);
    levels.classList.add("level", "new-element");
    levels.id = img.file.name;
    return levels;
  }

  public removeMedia(mediaPath: string): void {
    let i: number = 0;
    const nav: any = document.getElementById(mediaPath);

    for (const media of this.idMedias) {
      if (media.path === mediaPath) {
        this.idMedias.splice(i, 1);
      }
      i++;
    }
    nav.remove();
  }
}
