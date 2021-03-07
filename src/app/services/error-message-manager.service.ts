import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageManagerService {
  public errorMessages: Array<string>;
  public errorMessageTemplate: ErrorMessageTemplate = new ErrorMessageTemplate();

  constructor() {
    this.errorMessages = [];
  }

  private isMessageExisting(message: string): boolean {
    for (const errorMessage of this.errorMessages) {
      if (message === errorMessage) {
        return true;
      }
    }
    return false;
  }

  public addErrorMessage(message: string): void {
    if (!this.isMessageExisting(message)) {
      this.errorMessages.push(message);
    }
  }

  public removeErrorMessage(message: string): void {
    for (let i=0; i<this.errorMessages.length; i++) {
      if (message === this.errorMessages[i]) {
        this.errorMessages.splice(i, 1);
      }
    }
  }
}

export class ErrorMessageTemplate {
  readonly SIMPLE: string = 'Une erreur est survenue';
  readonly UNKNOWN: string = 'Une erreur inconnue est survenue';
}

export enum ErrorMessage {
  SIMPLE = 'Une erreur est survenue',
  UNKNOWN = 'Une erreur inconnue est survenue'
}
