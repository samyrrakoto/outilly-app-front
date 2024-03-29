import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sticky-menu',
  templateUrl: './sticky-menu.component.html',
  styleUrls: ['./sticky-menu.component.css']
})
export class StickyMenuComponent implements OnInit {
  @Input() sale: Sale;
  @Input() isSeller: boolean;
  @Input() mrCosts: number;
  @Input() priceToPay: number;
  @Input() errorMsg: any;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Input() proposedPrice: number;
  @Input() openState: boolean;
  deliveryName: string;
  deliveryFees: number;
  stickyMenuSteps: any;
  current: string;
  previous: string;
  next: string;
  nextAlt: string;

  constructor(public request: RequestService,
    public route: ActivatedRoute) {
    this.stickyMenuSteps = {
      deliveryOptions: true,
      buyingConfirmation: false,
      buyingProposition: false
    };
    this.current = 'deliveryOptions';
    this.previous = '';
    this.next = 'buyingConfirmation';
    this.deliveryName = '';
    this.deliveryFees = 0;
  }

  ngOnInit() {}

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
  }

  setFocus(id: string): void {
    const remises: Array<string> = ['mondial', 'hand'];

    document.getElementById(id).classList.add('chosen-remise');

    for (const remise of remises) {
      if (remise !== id) {
        document.getElementById(remise).classList.remove('chosen-remise');
      }
    }
  }
}
