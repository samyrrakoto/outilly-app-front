import { RegexTemplateService } from 'src/app/services/regex-template.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RelayPoint } from 'src/app/models/relay-point';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Modals } from 'src/app/models/modals';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Recipient } from 'src/app/models/recipient';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dispatch-note',
  templateUrl: './dispatch-note.component.html',
  styleUrls: ['./dispatch-note.component.css']
})
export class DispatchNoteComponent implements OnInit {
  user: User;
  order: any;
  relayPoint: RelayPoint;
  agreement: boolean = false;
  mrExpedition: number = null;
  modals: Modals;
  loading: boolean = false;
  generated: boolean = false;
  dispatchNoteA4: string = null;
  dispatchNoteA5: string = null;
  form: FormGroup;
  submitted: boolean = true;
  readonly nbAttempts: number = 3;

  constructor(
    private request: RequestService,
    private router: Router,
    private auth: AuthService,
    public regexTemplate: RegexTemplateService,
    public formBuilder: FormBuilder,
    public notification: NotificationService)
  {
    this.user = new User();
    this.relayPoint = new RelayPoint();
    this.modals = new Modals();
    this.modals.addModal('modify-information');
  }

  ngOnInit(): void {
    this.auth.getLogStatus();
    if (this.auth.accessToken !== 'good' || !this.auth.logged) {
      this.redirectToLogin();
    }
    this.order = JSON.parse(localStorage.getItem('order'));
    this.getOrder();
    this.getUserInfo()
      .then(() => this.getForm());
    this.getRelayPoint();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      mail: [this.user.userProfile.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.userProfile.phone1, [Validators.required, Validators.pattern(this.regexTemplate.PHONE)]],
      line1: [this.user.userProfile.mainAddress.line1, [Validators.required]],
      zipcode: [this.user.userProfile.mainAddress.zipcode, [Validators.required, Validators.pattern(this.regexTemplate.ZIPCODE)]],
      city: [this.user.userProfile.mainAddress.city, [Validators.required]]
    });
  }

  private getOrder(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.GET_ORDER, [this.order.id]).subscribe(
        (order: any) => {
          this.mrExpedition = order.mrExpedition;
          resolve();
        }
      )
    });
  }

  public resetNewInformation(): void {
    this.getForm();
  }

  public updateUserAddress(): Promise<any> {
    return new Promise((resolve) => {
      const payload: any = {
        'address': {
          'id': this.user.userProfile.mainAddress.id,
          'line1': this.form.get('line1').value,
          'zipcode': this.form.get('zipcode').value,
          'city': this.form.get('city').value
        }
      };

      this.request.putData(this.request.uri.UPDATE_ADDRESS, payload).subscribe(
        (res: any) => {
          resolve();
        }
      )
    });
  }

  public updateUserProfile(): Promise<any> {
    return new Promise((resolve) => {
      const payload: any = {
        'user': {
          'id': this.user.id,
          'userProfile' : {
            'id': this.user.userProfile.id,
            'email': this.form.get('mail').value,
            'phone1': this.form.get('phoneNumber').value
          }
        }
      };

      this.request.putData(this.request.uri.UPDATE_USER, payload).subscribe(
        (res: any) => {
          resolve();
        }
      );
    });
  }

  public updateUserData(): Promise<any> {
    return new Promise((resolve) => {
      this.updateUserAddress()
      .then(() => this.updateUserProfile())
      .then(() => this.getUserInfo())
      .then(() => resolve());
    })
  }

  public get controls() {
    return this.form.controls;
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.updateUserData()
      .then(() => {
        this.modals.close('modify-information');
        this.notification.display('Vos coordonnées ont bien été mises à jour', 'notification');
      });
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

  private createDispatchNote(): Promise<any> {
    return new Promise((resolve) => {
      const payload: any = {
        'orderId': this.order.id
      };

      this.request.postData(payload, this.request.uri.CREATE_RELAY_EXPEDITION).subscribe(
        (relayRes: any) => {
          resolve();
        }
      )
    });
  }

  public generateDispatchNote(times: number): void {
    const payload: any = {
      'orderId': this.order.id
    };

    this.createDispatchNote()
      .then(() => {
        this.request.postData(payload, this.request.uri.GET_DISPATCH_NOTE).subscribe(
          (relayRes: any) => {
            if ((relayRes.body.URL_Etiquette_A4 === null || relayRes.body.URL_Etiquette_A4 === null) && this.nbAttempts > 0) {
              this.generateDispatchNote(times--);
            }
            else {
              this.dispatchNoteA4 = relayRes.body.URL_Etiquette_A4;
              this.dispatchNoteA5 = relayRes.body.URL_Etiquette_A5;
              this.loading = false;
              this.generated = true;
            }
          }
        )
      });
  }
}
