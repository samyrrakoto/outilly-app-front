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
  @Input() sales: any[];
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

  public getProductRoute(sale: any): string {
    return '/product/' + sale.productSlug + '/' + sale.id;
  }

  public getBackgroundImgUrl(path: string): string {
    return "url('" + this.mediaBaseUri + path + "')";
  }
}
