import { environment } from 'src/environments/environment';
import { categoryIcons } from 'src/app/parameters';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private router: Router
  ) { }

  public categoryLabelToId(label: string): number {
    switch (label) {
      case 'Mécanique':
        return 1;
      case 'Bricolage':
        return 2;
      case 'Jardin':
        return 3;
      case 'Atelier':
        return 4;
      default:
        return -1;
    }
  }

  public getCategoryLabel(label: string): string {
    switch (label) {
      case 'mecanic':
        return 'Mécanique';
      case 'btp':
        return 'Bricolage';
      case 'garden':
        return 'Jardin';
      default:
        return null;
    }
  }

  public getCategoryRouteLabel(id: number): string {
    switch (id) {
      case 1:
        return 'mecanic';
      case 2:
        return 'btp';
      case 3:
        return 'garden';
      default:
        return null;
    }
  }

  public getIcon(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return categoryIcons.MECANIC;
      case 2:
        return categoryIcons.DIY;
      case 3:
        return categoryIcons.GARDEN;
      default:
        return null;
    }
  }

  public getCategoryRoute(categoryId: number, href: boolean = false): string {
    const categoryRouteLabel: string = this.getCategoryRouteLabel(categoryId);

    if (href) {
      return environment.mediaBaseUri + '/category/' + categoryRouteLabel;
    }
    else {
      return '/category/' + categoryRouteLabel;
    }
  }
}
