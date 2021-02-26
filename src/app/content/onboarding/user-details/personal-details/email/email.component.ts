import { FormCreatorService } from 'src/app/services/form-creator.service';
import { StepForm } from 'src/app/models/step-form';
import { accountOnboarding } from 'src/app/onboardings';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../../onboarding.component.css', './email.component.css']
})
export class EmailComponent extends StepForm {
  @ViewChild('email') email: ElementRef;
  readonly externalControl: boolean = true;
  error: string[] = [];
  user: User = new User();

  constructor(
    public formData: FormDataService,
    public formValidatorService: FormValidatorService,
    public formCreator: FormCreatorService,
    )
  {
    super(accountOnboarding, 'email');
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "usernameExistence";
    this.user = formData.user;
    this.stepName = "Votre adresse e-mail ?";
    this.stepSubtitle = 'Elle vous servira pour vous connecter.';
    this.placeholder = "jeanmarc78@aol.fr";
  }

  ngOnInit(): void {
    this.formCreator.getForm(this.getValidations());
  }

  ngAfterViewInit(): void {
    if (this.email.nativeElement !== null) {
      this.email.nativeElement.focus();
    }
  }

  ngOnChanges() {
    if (this.formData) {
      !this.formData.user.username ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    }
  }

  public getValidations(): any {
    return {
      mail: [this.user.userProfile.email, [Validators.required, Validators.email]]
    };
  }
}
