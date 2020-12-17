import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from './request.service';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  user: User = new User();
  birthdate: string = '';

  constructor(
    private request: RequestService,
    private router: Router,
    private auth: AuthService)
  {
    this.getUserInfos();
  }

  protected getUserInfos(): Promise<void> {
    return new Promise((resolve)=> {
      this.request.getUserInfos().subscribe(
        (value: any) => {
          this.userMapping(value);
          resolve()
        },
        () => {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      );
    });
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

}
