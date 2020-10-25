import { AuthService } from './../../../../services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { OrderSummaryComponent } from './../order-summary.component';
import { RelayPoint } from './../../../../models/relay-point';
import { Modals } from './../../../../models/modals';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['../order-summary.component.css', './delivery-summary.component.css']
})
export class DeliverySummaryComponent extends OrderSummaryComponent implements OnInit {
  modals: Modals;
  relayPoint: RelayPoint;

  constructor(public request: RequestService,
    public route: Router,
    public auth: AuthService,
    public location: Location) {
    super(request, route, auth, location);
    this.modals = new Modals();
    this.modals.addModal('relayPointPicture');
    this.relayPoint = new RelayPoint();

  }

  ngOnInit(): any {
    this.getRelayPoint();
  }

  private getRelayPoint(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.getData2(this.request.uri.GET_RELAY_POINT, [this.relayCountry, this.relayId]).subscribe({
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
