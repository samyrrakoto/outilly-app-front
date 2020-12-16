import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {
  readonly maxTitleSize: number = 42;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly resultsPerPage: number = 5;
  loaded: boolean = false;
  @Input() currentPage: number = 1;
  @Input() sales: Observable<any>;
  @Input() noMoreResults: boolean;
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
    )
  {
  }

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
