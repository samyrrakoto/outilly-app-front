import { InputService } from 'src/app/services/input.service';
import { accountOnboarding } from 'src/app/onboardings';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-passwordconfirmation',
  templateUrl: './passwordconfirmation.component.html',
  styleUrls: ['../../onboarding.component.css', './passwordconfirmation.component.css']
})
export class PasswordconfirmationComponent extends StepForm {
  @ViewChild('passwordConfirmation') passwordConfirmation: ElementRef;
  readonly root: string = '/account-onboarding/';
  user: User;
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder,
    public inputService: InputService)
  {
    super(accountOnboarding, 'passwordconfirmation');
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "pwdConfirmation";
    this.stepName = "Confirmez votre mot de passe";
    this.stepSubtitle = "Au cas où vous l'auriez oublié.";
    this.placeholder = "•••••••";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    if (this.passwordConfirmation.nativeElement) {
      this.passwordConfirmation.nativeElement.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      passwordConfirmation: [this.user.passwordConfirmation, [Validators.required, this.pwdMatching()]],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private pwdMatching(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const verifications: boolean = this.user.password === control.value;

        return verifications ? null : {notMatching: control.value};
      }
  }
}
