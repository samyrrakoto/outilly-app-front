import { AuthService } from './../../../../services/auth.service';
import { StickyService } from './../../../../services/sticky.service';
import { Component, OnInit } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInformationComponent } from '../../product-information.component';

@Component({
  selector: 'delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['../sticky-menu.component.css', './delivery-options.component.css']
})
export class DeliveryOptionsComponent extends StickyMenuComponent implements OnInit {
  isLogged: boolean;

  constructor(public request: RequestService,
    public route: ActivatedRoute,
    public auth: AuthService,
    public sticky: StickyMenuComponent) {
    super(request, route);
    this.sticky.current = 'deliveryOptions';
    this.sticky.previous = '';
    this.sticky.next = 'buyingConfirmation';
    this.sticky.nextAlt = 'buyingProposition';
    this.isLogged = undefined;
  }

  ngOnInit(): void {
    this.getLogStatus();
  }

  public nextStep() {
    if (this.deliveryName !== '') {
      this.sticky.nextStep();
    }
  }

  public nextAltStep() {
    if (this.deliveryName !== '') {
      this.sticky.nextAltStep();
    }
  }

  private getLogStatus(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.auth.isLoggedIn().subscribe({
        next: (value: boolean) => {
          this.isLogged = value;
          console.log(this.isLogged);
          resolve();
        },
        error: () => {
          this.isLogged = null;
          reject();
        }
      })
    });

    return promise;
  }
}
