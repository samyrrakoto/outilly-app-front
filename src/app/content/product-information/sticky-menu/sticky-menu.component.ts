import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'sticky-menu',
  templateUrl: './sticky-menu.component.html',
  styleUrls: ['./sticky-menu.component.css']
})
export class StickyMenuComponent implements OnInit {
  @Input() sale: Sale;
  @Input() errorMsg: any;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Input() proposedPrice: number;
  deliveryName: string;
  deliveryFees: number;
  panelOpenState: boolean;
  stickyMenuSteps: any;
  current: string;
  previous: string;
  next: string;
  nextAlt: string;

  constructor(request: RequestService, route: ActivatedRoute) {
    this.stickyMenuSteps = {
      deliveryOptions: true,
      buyingConfirmation: false,
      buyingProposition: false
    };
    this.current = 'deliveryOptions';
    this.previous = '';
    this.next = 'buyingConfirmation';
    this.deliveryName = 'Mondial Relay';
    this.deliveryFees = 6.90;
  }

  nextStep(): void {
    this.stickyMenuSteps[this.current] = false;
    this.stickyMenuSteps[this.next] = true;
    this.current = this.next;
  }

  nextAltStep(): void {
    this.stickyMenuSteps[this.current] = false;
    this.stickyMenuSteps[this.nextAlt] = true;
    this.current = this.nextAlt;
  }

  previousStep(): void {
    this.stickyMenuSteps[this.current] = false;
    this.stickyMenuSteps[this.previous] = true;
    this.current = this.previous;
  }

  setDelivery(id: string, deliveryName: string, deliveryFees: number): void {
    this.deliveryName = deliveryName;
    this.deliveryFees = deliveryFees;
    this.setFocus(id);
  }

  setFocus(id: string): void {
    const remises = ['mondial', 'colissimo', 'hand'];

    document.getElementById(id).classList.add('chosen-remise');

    for (const remise of remises) {
      if (remise !== id) {
        document.getElementById(remise).classList.remove('chosen-remise');
      }
    }
  }

  ngOnInit(): void {
  }

}
