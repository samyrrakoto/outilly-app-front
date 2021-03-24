import { MENU } from 'src/app/parameters';
import { UrlService } from 'src/app/services/url.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductCategory } from 'src/app/models/product-category';
import { RequestService } from 'src/app/services/request.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { staticLinks } from 'src/app/parameters';
import { Location } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navBarMenu') navBarMenu: ElementRef;
  readonly menuId: string = MENU.ID;
  readonly blogUri = staticLinks.BLOG_URI;
  categories: ProductCategory[] = [];

  constructor(
    private request: RequestService,
    public categoryService: CategoryService,
    public urlService: UrlService,
    private location: Location,
    private menu: MenuService
  ) {
    this.location.onUrlChange(() => {
      this.menu.showMenu();
    });
  }

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
