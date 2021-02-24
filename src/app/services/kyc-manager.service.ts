import { Injectable } from '@angular/core';
import { AskValidationStatus } from '../models/uri';
import { UserManagerService } from './user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class KycManagerService {

  constructor(
    private userManager: UserManagerService
  ) { }

  public hasBankInfo(): boolean {
    return this.userManager.user.mangoPayData.ibanId !== null;
  }

  public hasMangoPayData(): boolean {
    return this.userManager.user.mangoPayData !== null;
  }

  public hasKyc(): boolean {
    return this.userManager.user.mangoPayData.KYCdocs.length > 0;
  }

  public getKycDisplay(): boolean {
    const KYCstatus: AskValidationStatus = this.userManager.user.mangoPayData.KYCstatus;

    return KYCstatus === null || KYCstatus === AskValidationStatus.REFUSED;
  }

  public isKycCreated(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.CREATED;
  }

  public isKycAsked(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.VALIDATION_ASKED;
  }

  public isKycRefused(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.REFUSED;
  }
}
