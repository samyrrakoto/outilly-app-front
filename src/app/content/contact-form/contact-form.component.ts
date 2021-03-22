import { FormCreatorService } from 'src/app/services/form-creator.service';
import { ContactManagerService, ContactData } from 'src/app/services/contact-manager.service';
import { CaptchaService } from 'src/app/services/captcha.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { contact, savSubjects } from 'src/app/parameters';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent extends GenericComponent implements OnInit {
  @Input() click: Subject<any> = new Subject<any>();
  @Input() chosenSubject: string = 'Obtenir des informations complémentaires pour une annonce';
  @Input() message: string = '';
  contactData: ContactData = new ContactData();
  testInput: string = '';
  mailSent: boolean = null;
  loaded: boolean = false;
  error: boolean = null;
  readonly maxMessageLength: number = contact.MAX_MESSAGE_LENGTH;
  readonly subjects: string[] = savSubjects;

  constructor(
    public formCreator: FormCreatorService,
    private userManager: UserManagerService,
    private auth: AuthService,
    public contactManager: ContactManagerService,
    public captcha: CaptchaService)
  {
    super();
    this.modals.addModal('contact-form');
  }

  async ngOnInit(): Promise<void> {
    await this.doOnInit();
    this.contactData.subject = this.chosenSubject;
    this.contactData.message = this.message;
    this.loaded = true;
  }

  private async doOnInit(): Promise<void> {
    await this.handleUserMail();
    this.formCreator.getForm(this.getVerifications());
    this.captcha.generateRandomAddition();
    this.click.subscribe(
      () => { this.modals.open('contact-form') }
    );
  }

  private async handleUserMail(): Promise<void> {
    if (this.auth.isLogged()) {
      await this.getUserMail();
    }
    else {
      this.contactData.email = '';
      this.contactData.isAnonymous = true;
      this.contactData.userId = null;
    }
  }

  private async getUserMail(): Promise<void> {
    return new Promise((resolve) => {
      this.userManager.getUserInfos()
        .then(() => {
          this.contactData.email = this.userManager.user.userProfile.email;
          this.contactData.isAnonymous = false;
          this.contactData.userId = this.userManager.user.id;
          resolve();
        });
    });
  }

  public async sendMessage(): Promise<void> {
    try {
      await this.contactManager.sendMessage(this.contactData);
    }
    catch (e) {}
    finally {
      this.mailSent = true;
    }
  }

  public getVerifications(): any {
    return {
      message: [this.contactData.message, [Validators.required, Validators.maxLength(this.maxMessageLength)]],
      test: [this.testInput, [this.captcha.validTest()]],
      email: [this.contactData.email, [Validators.required, Validators.email]]
    };
  }

  public get form() {
    return this.formCreator.form;
  }

  public get controls() {
    return this.formCreator.controls;
  }
}
