import { MENU } from 'src/app/parameters';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public hideMenu(): void {
    const elem: HTMLElement = document.getElementById(MENU.ID);

    elem.style.zIndex = '0';
  }

  public showMenu(): void {
    const elem: HTMLElement = document.getElementById(MENU.ID);

    elem.style.zIndex = '40';
  }
}
