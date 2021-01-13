import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {

  constructor(
    private router: Router
  ) { }

  public categorySearch(categoryId: number): void {
    this.router.navigate(['/product-results'],
    {
      queryParams: {
        category: categoryId.toString()
      }
    });
  }
}
