import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  testImg: any[];
  @Input() sales: any;
  results: any[];
  currentPage: number;
  @Output() loadMoreEmitter: EventEmitter<number> = new EventEmitter<number>();
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly maxTitleSize: number = 42;

  constructor(private request: RequestService) {
    this.sales = [];
    this.currentPage = 1;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sales && changes.sales.currentValue) {
      this.results = changes.sales.currentValue.results;
    }
  }

  public sendLoadMore(): void {
    this.loadMoreEmitter.emit(this.currentPage);
    this.currentPage++;
  }
}
