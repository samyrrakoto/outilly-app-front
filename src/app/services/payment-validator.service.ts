import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentValidatorService {
  errorMessages: Array<string>;

  constructor() {
    this.errorMessages = [];
  }


  /* ERROR MESSAGES */
  private isMessageExisting(message: string): boolean {
    for (const errorMessage of this.errorMessages) {
      if (message === errorMessage) {
        return true;
      }
    }
    return false;
  }

  private addErrorMessage(message: string): void {
    if (!this.isMessageExisting(message)) {
      this.errorMessages.push(message);
    }
  }

  private removeErrorMessage(message: string): void {
    for (let i=0; i<this.errorMessages.length; i++) {
      if (message === this.errorMessages[i]) {
        this.errorMessages.splice(i, 1);
      }
    }
  }

  /* Constraints */
  private isNotNum(value: string, template: string): boolean {
    const regex: RegExp = /^[0-9]+$/;
    const message: string = template + ' doit contenir uniquement des chiffres';

    if (!value.match(regex)) {
      this.addErrorMessage(message);
      return false;
    }
    else {
      this.removeErrorMessage(message);
      return true;
    }
  }

  private isNotAlpha(value: string, template: string): boolean {
    const regex: RegExp = /^[a-zA-Z]+$/;
    const message: string = template + ' doit contenir uniquement des lettres';

    if (!value.match(regex)) {
      this.addErrorMessage(message);
      return false;
    }
    else {
      this.removeErrorMessage(message);
      return true;
    }
  }

  private wrongLength(value: any, length: number, template: string) {
    const message: string = template + ' doit faire ' + length + ' caractères';

    if (value.length !== length) {
      this.addErrorMessage(message);
      return false;
    }
    else {
      this.removeErrorMessage(message);
      return true;
    }
  }

  /* Verifications */
  private cardNumberVerify(value: string): boolean {
    const isNotNum: boolean = this.isNotNum(value, 'Le numéro de carte');

    if (isNotNum) {
      return false;
    }
    return true;
  }

  private cardExpirationMonthVerify(value: string): boolean {
    return false;
  }

  private cardExpirationYearVerify(value: any): boolean {
    const template: string = 'La date d\'expiration';
    const hasWrongLength: boolean = this.wrongLength(value, 2, template);
    const isNotNum: boolean = this.isNotNum(value, template);

    if (hasWrongLength || isNotNum) {
      return false;
    }
    return true;  }

  private cardCvxVerify(value: string): boolean {
    const template: string = 'Le code de sécurité';
    const hasWrongLength: boolean = this.wrongLength(value, 3, template);
    const isNotNum: boolean = this.isNotNum(value, template);

    if (hasWrongLength || isNotNum) {
      return false;
    }
    return true;
  }

  public verify(data: any): boolean {
    for (const property in data) {
      this[property + 'Verify'](data[property]);
    }
    return true;
  }
}
