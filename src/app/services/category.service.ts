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
      case 'mecanique':
        return 'Mécanique';
      case 'bricolage':
        return 'Bricolage';
      case 'jardin':
        return 'Jardin';
      case 'atelier':
        return 'Atelier';
      default:
        return null;
    }
  }

  public getCategoryRouteLabel(id: number): string {
    switch (id) {
      case 1:
        return 'mecanique';
      case 2:
        return 'bricolage';
      case 3:
        return 'jardin';
      case 4:
        return 'atelier';
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
      case 4:
        return categoryIcons.WORKSHOP;
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
