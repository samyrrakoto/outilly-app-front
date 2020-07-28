import { Component, OnInit } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'buying-proposition',
  templateUrl: './buying-proposition.component.html',
  styleUrls: ['../sticky-menu.component.css', './buying-proposition.component.css']
})
export class BuyingPropositionComponent extends StickyMenuComponent implements OnInit {

  constructor(request: RequestService, route: ActivatedRoute, public sticky: StickyMenuComponent) {
    super(request, route);
    this.sticky.current = 'buyingProposition';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
  }

  ngOnInit(): void {
  }

}
