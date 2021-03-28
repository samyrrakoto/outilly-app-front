import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['../products.component.css', './product-results.component.css']
})
export class ProductResultsComponent implements OnInit {
  placeholder: string = '';
  filters: string = '';
  categoryId: number;
  categoryLabel: string;
  icon: string = 'wrench';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public categoryService: CategoryService
    )
  {}

  ngOnInit(): void {
    this.getCategoryId();
  }

  private getCategoryId(): void {
      this.route.params.subscribe((param: any) => {
        if (param['categoryLabel']) {
          this.categoryLabel = param['categoryLabel'];
        }
        this.filters = 'categories:' + "\"" + this.categoryLabel + "\"";
        this.placeholder = 'Rechercher dans la catégorie ' + this.categoryLabel;
      });
  }
}
