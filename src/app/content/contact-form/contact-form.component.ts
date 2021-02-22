import { CaptchaService } from './../../services/captcha.service';
import { ContactManagerComponent } from 'src/app/models/contact-manager/contact-manager.component';
import { RequestService } from 'src/app/services/request.service';
import { EncodingService } from 'src/app/services/encoding.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { contact, savSubjects } from 'src/app/parameters';
import { Modals } from 'src/app/models/modals';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() click: Subject<any> = new Subject<any>();
  @Input() chosenSubject: string = 'Obtenir des informations complémentaires pour une annonce';
  @Input() message: string = '';
  form: FormGroup;
  email: string = '';
  testAddition: string = '';
  testInput: string = '';
  testResult: string = '';
  anonymous: boolean;
  userId: number = null;
  mailSent: boolean = null;
  error: boolean = null;
  modals: Modals = new Modals();
  contactManager: ContactManagerComponent = new ContactManagerComponent();
  readonly maxMessageLength: number = contact.MAX_MESSAGE_LENGTH;
  readonly subjects: string[] = savSubjects;

  constructor(
    private request: RequestService,
    private formBuilder: FormBuilder,
    private userManager: UserManagerService,
    private auth: AuthService,
    private encoding: EncodingService,
    public captcha: CaptchaService)
  {
    this.modals.addModal('contact-form');
  }

  ngOnInit(): void {
    this.getForm();
    this.getUserMail();
    this.captcha.generateRandomAddition();
    this.click.subscribe(
      () => { this.modals.open('contact-form') }
    );
  }

  private getUserMail(): void {
    this.auth.isLoggedIn().subscribe(
      (logStatus: boolean) => {
        if (logStatus) {
          this.userManager.getUserInfos()
            .then(() => {
              this.email = this.userManager.user.userProfile.email;
              this.anonymous = false;
              this.userId = this.userManager.user.id;
            });
        }
        else {
          this.email = '';
          this.anonymous = true;
          this.userId = null;
        }
      }
    );
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      message: [this.message, [Validators.required, Validators.maxLength(this.maxMessageLength)]],
      test: [this.testInput, [this.captcha.validTest()]],
      email: [this.email, [Validators.required, Validators.email]]
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private getPayload(): any {
    const payload: any = {
      subject: this.contactManager.getSlug(this.chosenSubject),
      message: this.encoding.base64Encoder(this.message),
      isAnonymous: this.anonymous,
      mail: this.email,
      userId: this.userId
    }

    return payload;
  }

  public sendMessage(): void {
    const payload: any = this.getPayload();

    this.request.postData(payload, this.request.uri.SEND_CONTACT_REQUEST).subscribe(
      () => {
        this.mailSent = true;
      },
      () => {
        this.error = true;
      }
    );
  }
}
