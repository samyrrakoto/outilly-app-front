import { RegexTemplateService } from 'src/app/services/regex-template.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './company-name.component.css']
})
export class CompanyNameComponent extends StepForm {
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
    this.formDataService.fieldName = "companyName";
    this.stepName = "Le nom de votre entreprise ?";
    this.stepNb = 5;
    this.path.previous = "5/status";
    this.path.current = "5/status/company-name";
    this.path.next = "5/status/siret";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('companyName').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      companyName: [this.user.userProfile.company.name, [Validators.required]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
