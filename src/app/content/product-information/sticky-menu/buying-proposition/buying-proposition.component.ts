import { Sale } from './../../../../models/sale';
import { Component, OnInit, Input } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'buying-proposition',
  templateUrl: './buying-proposition.component.html',
  styleUrls: ['../sticky-menu.component.css', './buying-proposition.component.css']
})
export class BuyingPropositionComponent implements OnInit {
  @Input() sale: Sale;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Input() errorMsg: any;
  @Input() proposedPrice: number;

  constructor(request: RequestService, route: ActivatedRoute, public sticky: StickyMenuComponent) {
    this.sticky.current = 'buyingProposition';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
  }

  ngOnInit(): void {
  }

}
