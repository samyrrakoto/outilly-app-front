import { RelayPoint } from 'src/app/models/relay-point';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Modals } from 'src/app/models/modals';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['../order-summary.component.css', './delivery-summary.component.css']
})
export class DeliverySummaryComponent implements OnInit {
  modals: Modals;
  relayPoint: RelayPoint;
  @Input() relayCountry: string;
  @Input() relayId: string;

  constructor(public request: RequestService,
    public route: Router,
    public auth: AuthService,
    public location: Location) {
    this.modals = new Modals();
    this.modals.addModal('relayPointPicture');
    this.relayPoint = new RelayPoint();
  }

  ngOnInit(): any {
    this.getRelayPoint();
  }

  private getRelayPoint(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getData(this.request.uri.GET_RELAY_POINT, [this.relayCountry, this.relayId]).subscribe({
        next: (value: RelayPoint) => {
          this.relayPoint = value;
          resolve();
        },
        error: () => {
          console.log('ERROR');
          reject();
        }
      });
    });
  }

  public backToRelay(): void {
    this.route.navigate(['checkout/delivery-information/mondial-relay-selector']);
  }
}
