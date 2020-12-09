import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['../../../onboarding.component.css', './zipcode.component.css']
})
export class ZipcodeComponent extends StepForm {
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
    this.formDataService.fieldName = "zipcode";
    this.stepNb = 8;
    this.stepName = "Votre code postal ?";
    this.path.current = "8/zipcode";
    this.path.previous = "7/country";
    this.path.next = "9/city";
    this.placeholder = "78350";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('zipcode').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      zipcode: [this.user.userProfile.mainAddress.zipcode, [Validators.required, Validators.pattern(this.regexTemplate.ZIPCODE)]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
