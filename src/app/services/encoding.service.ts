import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodingService {

  constructor() {
  }

  public base64Encoder(str: string): string {
    return btoa(unescape(encodeURIComponent(str)))
  }

  public base64Decoder(str: string): string {
    return decodeURIComponent(escape(window.atob(str)));
  }
}
