import { Router } from '@angular/router';
import { pageInfo } from 'src/app/parameters';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-herobody',
  templateUrl: './herobody.component.html',
  styleUrls: ['./herobody.component.css']
})
export class HerobodyComponent implements OnInit {
  readonly brandName: string = pageInfo.BRAND_NAME;
  @Input() logged: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public launchCategorySearch(categoryId: number): void {
    this.router.navigate(['/product-results'],
    {
      queryParams: {
        category: categoryId.toString()
      }
    });
  }
}
