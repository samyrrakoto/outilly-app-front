import { Injectable } from '@angular/core';
import { pwd } from '../parameters';

@Injectable({
  providedIn: 'root'
})
export class StringToolboxService {

  constructor() { }

  public capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public containsUpper(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "A".charCodeAt(0) && c.charCodeAt(0) <= "Z".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  public containsLower(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "a".charCodeAt(0) && c.charCodeAt(0) <= "z".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  public containsDigit(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "0".charCodeAt(0) && c.charCodeAt(0) <= "9".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  public containsSpecial(str: string): boolean {
    for (const c of str) {
      for (const specialChar of pwd.SPECIAL_CHARACTERS) {
        if (c === specialChar) {
          return true;
        }
      }
    }
    return false;
  }
}
