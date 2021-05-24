import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ProductAccessGuard implements CanActivate {

  constructor(
    private saleManager: SaleManagerService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkSaleAvailability(+route.params.id);
  }

  private async checkSaleAvailability(saleId: number): Promise<boolean> {
    const available: Promise<boolean> = this.saleManager.getSaleAvailability(saleId);

    return new Promise((resolve) => {
      available
        .then((available: boolean) => {
          if (available) {
            resolve(true);
          }
          else {
            this.router.navigate(['error404']);
            resolve(false);
          }
        })
        .catch(() => {
          this.router.navigate(['error404']);
          resolve(false);
        });
    });
  }
}
