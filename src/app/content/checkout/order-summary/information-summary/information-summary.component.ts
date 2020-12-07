import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Recipient } from 'src/app/models/recipient';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'app-information-summary',
  templateUrl: './information-summary.component.html',
  styleUrls: ['../order-summary.component.css', './information-summary.component.css']
})
export class InformationSummaryComponent implements OnInit {
  @Input() deliveryMethod: string;
  user: User;
  recipient: Recipient;
  modals: Modals;
  @Output() userEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output() recipientEmitter: EventEmitter<Recipient> = new EventEmitter<Recipient>();

  constructor(public request: RequestService,
    public router: Router,
    public auth: AuthService,
    public location: Location) {
      this.user = new User();
      this.recipient = new Recipient();
      this.modals = new Modals();
      this.modals.addModal('recipient-information');
    }

  ngOnInit(): any {
    this.getUser()
      .then(() => this.recipientMapping() );
  }

  private recipientMapping() {
    this.recipient.civility = this.user.userProfile.civility;
    this.recipient.firstname = this.user.userProfile.firstname;
    this.recipient.lastname = this.user.userProfile.lastname;
    this.recipient.addLine1 = this.user.userProfile.mainAddress.line1;
    this.recipient.city = this.user.userProfile.mainAddress.city;
    this.recipient.zipcode = this.user.userProfile.mainAddress.zipcode;
    this.recipient.phone = this.user.userProfile.phone1;
    this.recipient.email = this.user.userProfile.email;
    this.recipientEmitter.emit(this.recipient);
  }

  private getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getUserInfos().subscribe({
        next: (value: User) => {
          this.user = value;
          this.userEmitter.emit(this.user);
          resolve();
        }
      });
    });
  }

  public resetRecipientInfo(): void {
    this.recipientMapping();
  }

  public changeRecipientInfo(): void {
    this.user.userProfile.gender = this.recipient.civility;
    this.user.userProfile.firstname = this.recipient.firstname;
    this.user.userProfile.lastname = this.recipient.lastname;
    this.user.userProfile.mainAddress.line1 = this.recipient.addLine1;
    this.user.userProfile.mainAddress.city = this.recipient.city;
    this.user.userProfile.mainAddress.zipcode = this.recipient.zipcode;
    this.user.userProfile.phone1 = this.recipient.phone;
    this.user.userProfile.email = this.recipient.email;
    this.recipientEmitter.emit(this.recipient);
  }
}
