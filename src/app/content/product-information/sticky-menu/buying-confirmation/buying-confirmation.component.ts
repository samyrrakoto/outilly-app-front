import { Component, OnInit } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'buying-confirmation',
  templateUrl: './buying-confirmation.component.html',
  styleUrls: ['../sticky-menu.component.css', './buying-confirmation.component.css']
})
export class BuyingConfirmationComponent extends StickyMenuComponent implements OnInit {
  modals;

  constructor(request: RequestService, route: ActivatedRoute, public sticky: StickyMenuComponent) {
    super(request, route);
    this.sticky.current = 'buyingConfirmation';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
    this.modals = {
      buyingConfirmation: ''
    };
  }

  ngOnInit(): void {
  }

}
