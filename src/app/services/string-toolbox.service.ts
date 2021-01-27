import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringToolboxService {

  constructor() { }

  public capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
