import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-tva',
  templateUrl: './tva.component.html',
  styleUrls: ['../../../onboarding.component.css', './tva.component.css']
})
export class TvaComponent extends StepForm {
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
    this.formDataService.fieldName = "tva";
    this.stepName = "Votre numéro de TVA communautaire ?";
    this.stepSubtitle = "Si vous n'en avez pas (auto-entrepreneur par exemple), vous pouvez passer à la suite";
    this.stepNb = 5;
    this.path.previous = "5/status/siret";
    this.path.current = "5/status/tva";
    this.path.next = "6/birthdate";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('tva').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      tva: [this.user.userProfile.company.tvanumber, [this.validRegex()]],
    });
  }

  private validRegex(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const verifications: boolean = this.checkRegex(control.value);
        return verifications ? null : {notCorrect: control.value};
      }
  }

  private checkRegex(value: any): boolean {
    const allRegex: RegExp[] = [
      this.regexTemplate.TVA.FRANCE,
      this.regexTemplate.TVA.BELGIUM,
      this.regexTemplate.TVA.SWITZERLAND,
      this.regexTemplate.TVA.LUXEMBOURG
    ];

    for (const regex of allRegex) {
      if (value.match(regex)) {
        return true;
      }
    }
    return false;
  }

  public get controls() {
    return this.form.controls;
  }
}
