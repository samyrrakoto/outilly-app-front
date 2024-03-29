import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaService } from 'src/app/services/captcha.service';
import { MailService } from 'src/app/services/mail.service';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-demo-request',
  templateUrl: './demo-request.component.html',
  styleUrls: ['./demo-request.component.css']
})
export class DemoRequestComponent implements OnInit {
  form: FormGroup;
  success: boolean = null;
  messageData: MessageData = new MessageData();
  testInput: string = '';

  constructor(
    private mailService: MailService,
    private formBuilder: FormBuilder,
    private regex: RegexTemplateService,
    public captcha: CaptchaService
  ) {}

  ngOnInit(): void {
    this.getForm();
  }

  public askDemo(): void {
    this.mailService.askDemo(this.messageData.fullName, this.messageData.companyName, this.messageData.phoneNumber, this.messageData.email)
      .then(() => this.success = true)
      .catch(() => this.success = false);
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      fullName: [this.messageData.fullName, [Validators.required]],
      companyName: [this.messageData.companyName, [Validators.required]],
      phoneNumber: [this.messageData.phoneNumber, [Validators.required, Validators.pattern(this.regex.PHONE)]],
      email: [this.messageData.email, [Validators.required, Validators.email]],
      test: [this.testInput, [Validators.required, this.captcha.validTest()]]
    });
  }

  public get controls() {
    return this.form.controls;
  }
}

export class MessageData {
  fullName: string = '';
  companyName: string = '';
  phoneNumber: string = '';
  email: string = '';
}
