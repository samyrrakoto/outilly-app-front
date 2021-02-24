import { HttpStatus } from './request.service';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessageManagerService } from './error-message-manager.service';
import { OnboardingRequestService } from './onboarding-request.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingManagerService {
  accountCreated: boolean = false;
  profileCreated: boolean = false;

  constructor(
    private onboardingRequest: OnboardingRequestService,
    public errorManager: ErrorMessageManagerService,
  ) { }

  public createAccount(accountData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.onboardingRequest.createAccount(accountData).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.status === HttpStatus.CREATED) {
            this.accountCreated = true;
            resolve();
          }
          else {
            this.errorManager.addErrorMessage('Une erreur est survenue');
            reject();
          }
        },
        error: () => {
          this.errorManager.addErrorMessage('Une erreur est survenue');
          reject();
        }
      })
    });
  }

  public submitProfile(userData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.createProfile(userData.userProfile)
        .then(() => this.createAddress(userData.userProfile.mainAddress))
        .then(() => {
          if (userData.userProfile.type === 'professional') {
            return this.createCompany(userData.userProfile.company);
          }
        })
        .then(() => resolve())
        .catch(() => {
          reject();
        });
    });
  }

  public createProfile(profileData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.onboardingRequest.createProfile(profileData).subscribe({
        next: () => {
          resolve();
        },
        error: () => {
          this.errorManager.addErrorMessage('Une erreur est survenue');
          reject();
        }
      })
    });
  }

  public createAddress(addressData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.onboardingRequest.createAddress(addressData).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.status === HttpStatus.CREATED) {
            resolve();
          }
          else {
            this.errorManager.addErrorMessage('Une erreur est survenue');
            reject();
          }
        },
        error: () => {
          this.errorManager.addErrorMessage('Une erreur est survenue');
          reject();
        }
      })
    });
  }

  public createCompany(companyData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.onboardingRequest.createCompany(companyData).subscribe({
        next: (res: HttpResponse<any>) => {
          resolve();
        },
        error: () => {
          this.errorManager.addErrorMessage('Une erreur est survenue');
          reject();
        }
      })
    });
  }
}
