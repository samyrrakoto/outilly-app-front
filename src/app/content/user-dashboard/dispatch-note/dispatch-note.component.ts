import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RelayPoint } from 'src/app/models/relay-point';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'app-dispatch-note',
  templateUrl: './dispatch-note.component.html',
  styleUrls: ['./dispatch-note.component.css']
})
export class DispatchNoteComponent implements OnInit {
  user: User;
  order: any;
  relayPoint: RelayPoint;
  agreement: boolean;
  modals: Modals;
  newInformation: any;

  constructor(
    private request: RequestService,
    private router: Router,
    private auth: AuthService)
  {
    this.user = new User();
    this.relayPoint = new RelayPoint();
    this.agreement = false;
    this.newInformation = {};
    this.modals = new Modals();
    this.modals.addModal('modify-information');
  }

  ngOnInit(): void {
    this.auth.getLogStatus();
    if (this.auth.accessToken !== 'good' || !this.auth.logged) {
      this.redirectToLogin();
    }
    this.order = JSON.parse(localStorage.getItem('order'));
    this.getUserInfo()
      .then(() => this.prepareNewInformation());
    this.getRelayPoint();
  }

  public prepareNewInformation(): void {
    this.newInformation = {
      'phoneNumber': this.user.userProfile.phone1,
      'mail': this.user.userProfile.email,
      'address': {
        'line1': this.user.userProfile.mainAddress.line1,
        'zipcode': this.user.userProfile.mainAddress.zipcode,
        'city': this.user.userProfile.mainAddress.city
      }
    };
  }

  private getUserInfo(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getUserInfos().subscribe(
        (user: User) => {
          this.user = user;
          resolve();
        }
      );
    });
  }

  private getRelayPoint(): Promise<any> {
    const relayCountry = this.order.relayCountry.isoCode;
    const relayId = this.order.relayPointId;

    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_RELAY_POINT, [relayCountry, relayId]).subscribe({
        next: (value: RelayPoint) => {
          this.relayPoint = value;
          resolve();
        },
        error: () => {
          reject();
        }
      });
    });
  }

  private redirectToLogin(): void {
    sessionStorage.setItem('redirect_after_login', '/user/dashboard/dispatch-note');
    this.router.navigate(['/login']);
  }

  public generateDispatchNote(): void {

  }
}
