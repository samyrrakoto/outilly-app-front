import { RegexTemplateService } from 'src/app/services/regex-template.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { StatusComponent } from '../../personal-details/status/status.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-siret',
  templateUrl: './siret.component.html',
  styleUrls: ['../../../onboarding.component.css', './siret.component.css']
})
export class SiretComponent extends StepForm {
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
    this.formDataService.fieldName = "siret";
    this.stepName = "Votre numéro de SIRET ?";
    this.stepSubtitle = "Il s'agit d'un numéro d'identification à 14 chiffres";
    this.stepNb = 5;
    this.path.previous = "5/status";
    this.path.current = "5/status/siret";
    this.path.next = "5/status/tva";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('siret').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      siret: [this.user.userProfile.company.siret, [Validators.required, Validators.pattern(this.regexTemplate.SIRET)]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
