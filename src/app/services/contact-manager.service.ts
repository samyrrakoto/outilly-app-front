import { ErrorMessage, ErrorMessageManagerService } from 'src/app/services/error-message-manager.service';
import { ContactRequestService } from './contact-request.service';
import { Injectable } from '@angular/core';
import { EncodingService } from './encoding.service';
import { HttpStatus } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ContactManagerService {
  encoding: EncodingService = new EncodingService;
  errorManager: ErrorMessageManagerService = new ErrorMessageManagerService;

  constructor(
    private contactRequest: ContactRequestService,
  ) { }

  private getPayload(contactData: ContactData): any {
    const payload: any = {
      subject: this.getSlug(contactData.subject),
      message: this.encoding.base64Encoder(contactData.message),
      isAnonymous: contactData.isAnonymous,
      mail: contactData.email,
      userId: contactData.userId
    }
    return payload;
  }

  public async sendMessage(contactData: ContactData): Promise<void> {
    const payload: any = this.getPayload(contactData);

    return new Promise((resolve, reject) => {
      this.contactRequest.sendMessage(payload).subscribe({
        next: (res: any) => {
          if (res.status === HttpStatus.OK) {
            resolve();
          }
          else {
            this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
            reject();
          }
        },
        error: () => {
          this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
          reject()
        }
      });
    });
  }

  private getSlug(subject: string): string {
    switch(subject) {
      case 'Obtenir des informations complémentaires pour une annonce':
        return 'more-infos-on-listing';
      case 'J\'ai une question à propos de ma commande (SAV)':
        return 'question-about-order';
      case 'Je rencontre un problème technique sur le site':
        return 'technical-issue';
      case 'Je suis professionnel(le) et souhaite être accompagné(e)':
        return 'pro-partnership';
      case 'Je souhaite contacter les équipes marketing':
        return 'marketing-contact-request';
      case 'Je souhaite modifier mes informations personnelles':
        return 'infos-update-request';
      case 'Je souhaite modifier mes coordonnées bancaires':
        return 'bank-infos-update-request';
      case 'Autre':
        return 'other';
    }
  }
}

export class ContactData {
  subject: string = '';
  message: string = '';
  isAnonymous: boolean = true;
  email: string = '';
  userId: number = 0;
}
