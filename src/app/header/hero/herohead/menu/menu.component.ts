import { UrlService } from './../../../../services/url.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductCategory } from 'src/app/models/product-category';
import { RequestService } from 'src/app/services/request.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { staticLinks } from 'src/app/parameters';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navBarMenu') navBarMenu: ElementRef;
  categories: ProductCategory[] = [];
  blogUri = staticLinks.BLOG_URI;

  constructor(
    private request: RequestService,
    public categoryService: CategoryService,
    public urlService: UrlService
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
}
