import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardValidatorService {
  errorMessages: Array<string> = [];
  readonly fieldsToTest: Array<string> = ['newPwd'];

  constructor() { }

  private removeErrorMsg(item: any): void {
    const pos: number = this.errorMessages.indexOf(item);

    this.errorMessages.splice(pos, 1);
  }

  private addErrorMsg(errorMsg: string) {
    if (!this.errorMessages.includes(errorMsg)) {
      this.errorMessages.push(errorMsg);
    }
  }

  private newPwdVerify(user: User): boolean {
    const newPwd:string = user.newPassword;
    const newPwdConfirmation: string = user.passwordConfirmation;
    const errorMsg: string = 'Les mots de passe ne correspondent pas';

    if (newPwd !== newPwdConfirmation) {
      this.addErrorMsg(errorMsg);
      return false;
    }
    this.removeErrorMsg(errorMsg);
    return true;
  }

  public verify(user: User): boolean {
    for (const field of this.fieldsToTest) {
      if (!this[field + 'Verify'](user)) {
        return false;
      }
    return true;
    }
  }
}
