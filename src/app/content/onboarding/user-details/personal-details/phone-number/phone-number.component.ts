import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['../../../onboarding.component.css', './phone-number.component.css']
})
export class PhoneNumberComponent extends StepForm {
  readonly root: string = '/onboarding/';
  user: User;
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder,
    public regexTemplate: RegexTemplateService)
  {
    super();
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "phoneNumber";
    this.stepNb = 11;
    this.stepName = "Quel est votre numéro de téléphone ?";
    this.isMandatory = false;
    this.path.current = '11/phonenumber';
    this.path.previous = "10/street";
    this.path.next = "12/password";
    this.placeholder = "0601020304";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('phone').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      phone: [this.user.userProfile.phone1, [Validators.required, Validators.pattern(this.regexTemplate.PHONE)]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
