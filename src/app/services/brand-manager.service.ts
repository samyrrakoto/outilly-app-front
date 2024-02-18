import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Brand } from './../models/brand';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandManagerService {
  brands: Brand[];

  constructor(
    private request: RequestService,
    private router: Router
  ) { }

  public getBrands(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.BRANDS).subscribe(
        (brands: Brand[]) => {
          this.brands = brands;
          resolve();
        }
      )
    });
  }

  public getBrandId(brandName: string): number {
    for (const brand of this.brands) {
      if (brand.name.toLowerCase() === brandName.toLowerCase())
        return brand.id;
    }
  }

  public getBrandUrl(brandName: string): string {
    const brandId: number = this.getBrandId(brandName);

    return '/products/brand/' + brandId.toString();
  }
}
