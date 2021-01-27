import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor() { }

  public passwordDisplay(elem: HTMLInputElement): void {
    elem.type = elem.type === 'password' ? 'text' : 'password';
  }
}
