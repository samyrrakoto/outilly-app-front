import { PageNameManager } from 'src/app/models/page-name-manager';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {
  saleId: number = 0;
  userId: number = 0;
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly pageTitle: string = 'Editer mon annonce';

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private request: RequestService,
    private router: Router) {}

  ngOnInit(): void {
    this.pageNameManager.setTitle(this.pageTitle);
    this.getUserId();
    this.getIdFromUrl()
      .then(() => this.getSaleData());
  }

  /*
  ** Data getting
  */
  private getIdFromUrl(): Promise<any> {
    return new Promise((resolve) => {
      this.route.params.subscribe({
        next: (params: any) => {
          this.saleId = +params['saleId'];
          resolve()
        }
      });
    });
  }

  private getUserId(): void {
    this.userId = +sessionStorage.getItem('userId');
  }

  private getSaleData(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.SECURE_SALE, [this.saleId.toString()]).subscribe({
        next: (sale: Sale) => {
          if (this.isSold(sale)) {
            this.router.navigate(['/error404']);
          }
          resolve();
        },
        error: () => {
          this.router.navigate(['/error404']);
        }
      });
    });
  }

  /*
  ** Checks
  */
  private isSold(sale: Sale): boolean {
    return sale.status === 'sold';
  }
}
