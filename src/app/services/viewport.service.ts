import { VIEWPORT } from 'src/app/parameters';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  constructor() { }

  public get(): Viewport {
    if (window.innerWidth <= VIEWPORT.MOBILE) {
      return Viewport.MOBILE;
    }
    else if (window.innerWidth <= VIEWPORT.TABLET) {
      return Viewport.TABLET;
    }
    else {
      return Viewport.DESKTOP;
    }
  }

  public check(viewport: Viewport): boolean {
    return viewport === this.get();
  }
}

export enum Viewport {
  MOBILE = 'Mobile',
  TABLET = 'Tablet',
  DESKTOP = 'Desktop'
}
