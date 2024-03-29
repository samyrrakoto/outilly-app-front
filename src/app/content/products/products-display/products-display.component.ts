import { environment } from 'src/environments/environment';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {
  readonly maxTitleSize: number = 42;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly frontBaseUri: string = environment.frontBaseUri;
  @Input() sales: any[];
  @Input() search: boolean = false;
  @Input() mobileNbMax: number = null;
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();
  loaded: boolean = false;

  constructor()
  {}

  ngOnInit(): void {
  }

  public loadMoreCall(): void {
    this.loadMore.emit();
  }

  public getProductRoute(sale: any, href: boolean=false): string {
    if (href) {
      return this.frontBaseUri + '/product/' + sale.productSlug + '/' + sale.id;
    }
    else {
      return '/product/' + sale.productSlug + '/' + sale.id;
    }
  }

  public getBackgroundImgUrl(path: string): string {
    if (this.search) {
      return "url('" + path + "')";
    }
    else {
      return "url('" + this.mediaBaseUri + path + "')";
    }
  }
}
