import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StickyService {
  openState: boolean;

  constructor() {
    this.openState = false;
  }
}
