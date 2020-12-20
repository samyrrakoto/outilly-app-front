import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { StickyMenuComponent } from '../sticky-menu.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { Purchase } from 'src/app/models/purchase';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'buying-proposition',
  templateUrl: './buying-proposition.component.html',
  styleUrls: ['../sticky-menu.component.css', './buying-proposition.component.css']
})
export class BuyingPropositionComponent implements OnInit {
  form: FormGroup;
  @Input() sale: Sale;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Input() errorMsg: any;
  @Input() proposedPrice: number;
  purchases: Array<Purchase>;
  currentPurchase: Purchase;
  id: number;
  bidAmount: number = 0;
  bidPlaced: boolean = false;

  constructor(public request: RequestService,
    public route: ActivatedRoute,
    public router: Router,
    public sticky: StickyMenuComponent,
    public bidManager: BidManagerService,
    public purchaseManager: PurchaseManagerService,
    public notification: NotificationService,
    public formBuilder: FormBuilder) {
    this.sticky.current = 'buyingProposition';
    this.sticky.previous = 'deliveryOptions';
    this.sticky.next = '';
    this.purchases = [];
    this.currentPurchase = null;
  }

  ngOnInit(): void {
    this.getForm();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      proposedPrice: [this.sticky.proposedPrice , [Validators.required, Validators.min(this.minPrice), Validators.max(this.maxPrice)]]
    });
  }

  public get controls() {
    return this.form.controls;
  }

  public placeBid(amount: number): void {
    if (this.checkBidValue(amount)) {
      this.bidManager.place(amount * 100, this.sale.id);
      this.bidAmount = amount;
      this.bidPlaced = true;
    }
  }

  public goToSales(): void {
    this.router.navigate(['/user/dashboard/activity-log/purchases']);
  }

  private checkBidValue(amount: number): boolean {
    return amount >= this.sticky.minPrice && amount <= this.sticky.maxPrice;
  }
}
