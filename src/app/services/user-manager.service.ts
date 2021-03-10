import { UserRequestService } from 'src/app/services/user-request.service';
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
import { AskValidationStatus } from 'src/app/services/kyc-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  user: User = new User();
  activated: boolean;
  birthdate: Date = new Date();
  purchases: Purchase[];
  sales: Sale[];

  constructor(
    private request: RequestService,
    private userRequest: UserRequestService,
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
            resolve(user.id);
          }
        );
      }
      else {
        resolve(-1);
      }
    });
  }

  public async getUserAddress(): Promise<Address> {
    return new Promise((resolve)=> {
      this.request.getUserInfos().subscribe(
        (user: User) => {
          resolve(user.userProfile.mainAddress);
        }
      );
    });
  }

  public async getUserInfos(): Promise<void> {
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

  public async getValidationStatus(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userRequest.getValidationStatus().subscribe({
        next: (res: any) => {
          console.log(res);
          this.user.mangoPayData.KYCstatus = res.status;
          resolve();
        },
        error: () => {
          reject();
        }
      })
    });
  }

  public isActivated(): boolean {
    return localStorage.getItem('userStatus') === 'activated';
  }

  private async userMapping(userRes: any): Promise<void> {
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
    this.user.userProfile.emailOptin = userRes.userProfile.emailOptin;
    this.user.userProfile.phone1 = userRes.userProfile.phone1;
    this.user.userProfile.phone1Optin = userRes.userProfile.phone1Optin;
    this.user.userProfile.phone2 = userRes.userProfile.phone2;
    this.user.mangoPayData = userRes.mangoPayData;
    if (this.user.mangoPayData.KYCstatus && this.user.mangoPayData.KYCstatus !== AskValidationStatus.VALIDATED) {
      await this.getValidationStatus();
    }
  }

  private birthdateMapping(userRes: any): void {
    const userBirthdate: any = userRes.userProfile.birthdate *= 1000; // converting into milliseconds
    const day: any = new Date(userBirthdate).getDate() < 10 ? '0' + new Date(userBirthdate).getDate() : new Date(userBirthdate).getDate();
    const month: any = new Date(userBirthdate).getMonth() + 1 < 10 ? '0' + (new Date(userBirthdate).getMonth() + 1) : (new Date(userBirthdate).getMonth() + 1);
    const year: any = new Date(userBirthdate).getFullYear()

    this.birthdate = new Date(year + '-' + month + '-' + day);
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
        bid.isClosed = purchase.isClosed;
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
