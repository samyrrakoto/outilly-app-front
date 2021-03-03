import { Viewport, ViewportService } from 'src/app/services/viewport.service';
import { FormCreatorService } from 'src/app/services/form-creator.service';
import { pwd } from 'src/app/parameters';
import { InputService } from 'src/app/services/input.service';
import { accountOnboarding } from 'src/app/onboardings';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { StepForm } from 'src/app/models/step-form';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { StringToolboxService } from 'src/app/services/string-toolbox.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../../onboarding.component.css', './password.component.css']
})
export class PasswordComponent extends StepForm {
  @ViewChild('password') password: ElementRef;
  readonly minPwdLength: number = pwd.MIN_PWD_LENGTH;
  user: User;

  constructor(
    public formData: FormDataService,
    public formCreator: FormCreatorService,
    public inputService: InputService,
    private strToolbox: StringToolboxService,
    private viewport: ViewportService)
  {
    super(accountOnboarding, 'password');
    !this.formData.user.username ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.stepName = "Créez un mot de passe sécurisé";
    this.stepSubtitle = "Au moins " + this.minPwdLength + " caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
    this.placeholder = "•••••••";
  }

  ngOnInit(): void {
    this.formCreator.getForm(this.getValidations());
  }

  ngAfterViewInit(): void {
    if (!this.viewport.check(Viewport.MOBILE) && this.password.nativeElement !== null) {
      this.password.nativeElement.focus();
    }
  }

  public getValidations(): any {
    return {
      password: [this.user.password, [Validators.required, this.validFormat()]],
      passwordConfirmation: [this.user.passwordConfirmation, [Validators.required, this.pwdMatching()]]
    };
  }

  private validFormat(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const longEnough: boolean = control.value.length >= this.minPwdLength;
        const containsUpper: boolean = this.strToolbox.containsUpper(control.value);
        const containsLower: boolean = this.strToolbox.containsLower(control.value);
        const containsDigit: boolean = this.strToolbox.containsDigit(control.value);
        const containsSpecialCharacter: boolean = this.strToolbox.containsSpecial(control.value);

        const verifications: boolean = longEnough && containsUpper && containsLower && containsDigit && containsSpecialCharacter;
        return verifications ? null : {notCorrect: control.value};
      }
  }

  private pwdMatching(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const verifications: boolean = this.user.password === control.value;

        return verifications ? null : {notMatching: control.value};
      }
  }
}
