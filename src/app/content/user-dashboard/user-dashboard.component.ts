import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { Address } from 'src/app/models/address';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  url: string = '';
  birthdate: string = '';
  user: User = new User();
  dashboardTab: string = 'information';
  readonly menuTabs: Array<string> = ['information', 'activities', 'sell'];
  readonly pageTitle: string = 'Outilly | Tableau de bord';

  constructor(
    protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    public title: Title)
  {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.getUserInfos();
  }

  ngAfterViewChecked(): void {}

  public logOut(): void {
    this.auth.logout();
  }

  public setFocus(tabs: Array<string>, id: string): void {
    for (const tab of tabs) {
      if (tab !== id) {
        document.getElementById(tab).classList.remove('is-active');
      }
    }

    document.getElementById(id).classList.add('is-active');
  }

  protected getUserInfos() {
    this.request.getUserInfos().subscribe(
      (value: any) => this.userMapping(value),
      () => {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    );
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
