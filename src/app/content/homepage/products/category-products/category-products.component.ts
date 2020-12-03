import { environment } from '../../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['../products.component.css', './category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  @Input() sales: Observable<any>;
  @Input() maxTitleSize: number;
  @Input() title: string;
  @Input() categoryIcon: string;
  readonly mediaBaseUri: string = environment.mediaBaseUri;

  constructor() {
    this.categoryIcon = 'box';
  }

  ngOnInit(): void {
  }

}
