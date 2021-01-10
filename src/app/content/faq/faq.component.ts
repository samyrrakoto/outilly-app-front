import { Faq } from 'src/app/models/faq';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  loaded: boolean = false;
  buyerFaq: Faq[] = [];
  sellerFaq: Faq[] = [];
  
  constructor(
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.getBuyerFaq()
      .then(() => this.getSellerFaq())
      .then(() => this.loaded = true);
  }

  private getBuyerFaq(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.FAQ_BUYER).subscribe({
        next: (faq: any) => {
          this.buyerFaq = faq.faqItems;
          resolve();
        }
      })
    });
  }

  private getSellerFaq(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.FAQ_SELLER).subscribe({
        next: (faq: any) => {
          this.sellerFaq = faq.faqItems;
          resolve();
        }
      })
    });
  }
}
