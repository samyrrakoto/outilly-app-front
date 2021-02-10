import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  public getRoute(route: string, href: boolean = false): string {
    if (href) {
      return environment.mediaBaseUri + '/' + route;
    }
    else {
      return '/' + route;
    }
  }

  public getProductRoute(saleId: number, slug: string, href: boolean = false): string {
    const uri: string = '/product/' + slug + '/' + saleId;

    if (href) {
      return environment.mediaBaseUri + uri;
    }
    else {
      return uri;
    }
  }

  public getLoginRoute(href: boolean = false): string {
    const uri: string = '/login/';

    if (href) {
      return environment.mediaBaseUri + uri;
    }
    else {
      return uri;
    }
  }
}
