import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category';
import { RequestService } from 'src/app/services/request.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navBarMenu') navBarMenu: ElementRef;
  categories: ProductCategory[] = [];

  constructor(
    private request: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  public toggleNavbar(): void {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navBarMenu.nativeElement.classList.toggle('is-active');
  }

  private getCategories(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.CATEGORIES).subscribe(
        (categories: ProductCategory[]) => {
          this.categories = categories;
          resolve();
        }
      )
    });
  }

  public launchCategorySearch(categoryId: number): void {
    this.router.navigate(['/product-results'],
    {
      queryParams: {
        category: categoryId.toString()
      }
    });
  }
}
