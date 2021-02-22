import { Injectable } from '@angular/core';
import { ContactManagerComponent } from '../models/contact-manager/contact-manager.component';
import { EncodingService } from './encoding.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private contactManager: ContactManagerComponent;

  constructor(
    private request: RequestService,
    private encoding: EncodingService
  ) { }

  private getPayload(chosenSubject: string, message: string, anonymous: boolean, email: string, userId: number): any {
    const payload: any = {
      subject: this.contactManager.getSlug(chosenSubject),
      message: this.encoding.base64Encoder(message),
      isAnonymous: anonymous,
      mail: email,
      userId: userId
    }

    return payload;
  }

  private getDemoPayload(fullName: string, companyName: string, phoneNumber: string, email: string): any {
    return {
      subject: "demo-request",
      fullname: fullName,
      companyName: companyName,
      phone: phoneNumber,
      mail: email,
      isAnonymous: true
    }
  }

  public sendMessage(chosenSubject: string, message: string, anonymous: boolean, email: string, userId: number): Promise<void> {
    const payload: any = this.getPayload(chosenSubject, message, anonymous, email, userId);

    return new Promise((resolve, reject) => {
      this.request.postData(payload, this.request.uri.SEND_CONTACT_REQUEST).subscribe(
        () => {
          resolve();
        },
        () => {
          reject();
        }
      );
    });
  }

  public askDemo(fullName: string, companyName: string, phoneNumber: string, email: string): Promise<void> {
    const payload: any = this.getDemoPayload(fullName, companyName, phoneNumber, email);

    return new Promise((resolve, reject) => {
      this.request.postData(payload, this.request.uri.SEND_CONTACT_REQUEST).subscribe({
        next: (res: any) => {
          resolve();
        },
        error: () => {
          reject();
        }
      })
    })
  }
}
