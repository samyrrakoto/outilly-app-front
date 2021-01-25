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
    this.newGetCategoryId();
  }

  private newGetCategoryId(): void {
      this.route.params.subscribe((param: any) => {
        this.categoryLabel = this.categoryService.getCategoryLabel(param['categoryLabel']);
        this.categoryId = this.categoryService.categoryLabelToId(this.categoryLabel);
        this.filters = 'categories:' + this.categoryLabel;
        this.placeholder = 'Rechercher dans la catégorie ' + this.categoryLabel;

        if (this.categoryId === -1) {
          this.router.navigate(['error404']);
        }
      });
  }
}
