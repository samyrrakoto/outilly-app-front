import { NotificationService } from './../../../../notification.service';
import { User } from 'src/app/models/user';
import { PurchaseManagerService } from './../../../../purchase-manager.service';
import { Purchase } from './../../../../models/purchase';
import { BidManagerService } from './../../../../bid-manager.service';
import { Sale } from './../../../../models/sale';
import { Component, OnInit, Input } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  purchases: Array<Purchase>;
  currentPurchase: Purchase;
  id: number;

  constructor(public request: RequestService,
    public route: ActivatedRoute,
    public router: Router,
    public sticky: StickyMenuComponent,
    public bidManager: BidManagerService,
    public purchaseManager: PurchaseManagerService,
    public notification: NotificationService) {
    this.sticky.current = 'buyingProposition';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
    this.sticky.maxPrice /= 100;
    this.sticky.minPrice /= 100;
    this.sticky.proposedPrice /= 100;
    this.sticky.proposedPrice -= 5;
    this.purchases = [];
    this.currentPurchase = null;
  }

  ngOnInit(): void {}

  public placeBid(amount: number): void {
    this.bidManager.place(amount * 100, this.sale.id);
    this.notification.display('Votre offre a bien été envoyée', 'proposition');
  }

  public goToSales(): void {
    this.router.navigate(['/user/dashboard/activity-log/purchases']);
  }
}
