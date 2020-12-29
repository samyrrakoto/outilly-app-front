import { Bid } from 'src/app/models/bid';
import { Sale } from 'src/app/models/sale';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from './request.service';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  user: User = new User();
  activated: boolean;
  birthdate: string = '';
  purchases: Purchase[];
  sales: Sale[];

  constructor(
    private request: RequestService,
    private router: Router,
    private auth: AuthService,
    private purchaseManager: PurchaseManagerService)
  {}

  ngOnInit(): void {
  }

  public getUserId(): Promise<number> {
    return new Promise((resolve)=> {
      if (this.auth.isLogged()) {
      this.request.getUserInfos().subscribe(
        (user: any) => {
          resolve(user.id)
        }
      );
      }
      else {
        resolve(-1);
      }
    });
  }

  public getUserInfos(): Promise<void> {
    return new Promise((resolve)=> {
      this.request.getUserInfos().subscribe(
        (user: any) => {
          this.userMapping(user);
          resolve()
        },
        () => {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      );
    });
  }

  public isActivated(): boolean {
    return localStorage.getItem('userStatus') === 'activated';
  }

  private userMapping(userRes: any): void {
    this.user.id = userRes.id;
    this.user.username = userRes.username;
    this.user.userProfile.id = userRes.userProfile.id;
    this.user.userProfile.firstname = userRes.userProfile.firstname;
    this.user.userProfile.lastname = userRes.userProfile.lastname;
    this.birthdateMapping(userRes);
    this.user.userProfile.gender = userRes.userProfile.gender;
    this.user.userProfile.type = userRes.userProfile.type;
    this.user.userProfile.company = userRes.userProfile.company;
    this.addressesMapping(userRes);
    this.user.userProfile.email = userRes.userProfile.email;
    this.user.userProfile.phone1 = userRes.userProfile.phone1;
    this.user.userProfile.phone1Optin = userRes.userProfile.phone1Optin;
    this.user.userProfile.phone2 = userRes.userProfile.phone2;
  }

  private birthdateMapping(userRes: any): void {
    const userBirthdate: any = userRes.userProfile.birthdate *= 1000; // converting into milliseconds
    const day: any = new Date(userBirthdate).getDate() < 10 ? '0' + new Date(userBirthdate).getDate() : new Date(userBirthdate).getDate();
    const month: any = new Date(userBirthdate).getMonth() + 1 < 10 ? '0' + (new Date(userBirthdate).getMonth() + 1) : (new Date(userBirthdate).getMonth() + 1);
    const year: any = new Date(userBirthdate).getFullYear()

    this.birthdate = year + '-' + month + '-' + day;
  }

  private addressesMapping(userRes: any): void {
    let i: number = 0;
    this.user.userProfile.addresses = [];

    for (const address of userRes.userProfile.addresses) {
      this.user.userProfile.addresses.push(new Address());
      this.user.userProfile.addresses[i] = address;
      i++;
    }
  }

  public getPurchases(): Promise<Purchase[]> {
    return new Promise((resolve) => {
      this.purchaseManager.getPurchases()
        .then((purchases) => {
          resolve(purchases);
        })
    });
  }

  public getBid(saleId: number, purchases: Purchase[]): Bid {
    const bid: Bid = new Bid();

    for (const purchase of purchases) {
      if (purchase.sale.id === saleId) {
        bid.amount = purchase.bidAmount;
        bid.counterOfferAmount = purchase.counterOfferAmount;
        bid.isAccepted = purchase.isAccepted;
        return bid;
      }
    }
    return null;
  }

  public hasBidded(saleId: number, purchases: Purchase[]): boolean {
    for (const purchase of purchases) {
      if (purchase.sale.id === saleId) {
        return true;
      }
    }
    return false;
  }

  public isUserSeller(saleId: number): boolean {
    for (const sale of this.sales) {
      if (sale.id === saleId) {
        return true;
      }
    }
    return false;
  }
}
