import { MENU } from 'src/app/parameters';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private getMenu(): HTMLElement {
    return document.getElementById(MENU.ID);
  }

  public hideMenu(): void {
    if (this.getMenu()) {
      this.getMenu().style.zIndex = MenuValue.HIDDEN;
    }
  }

  public showMenu(): void {
    if (this.getMenu()) {
      this.getMenu().style.zIndex = MenuValue.DEFAULT;
    }
  }
}

enum MenuValue {
  DEFAULT = '30',
  HIDDEN = '0'
}
