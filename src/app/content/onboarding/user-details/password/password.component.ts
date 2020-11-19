import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../../onboarding.component.css', './password.component.css']
})
export class PasswordComponent extends OnboardingComponent {
  @ViewChild('pwd') pwd: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "pwd";
    this.stepNb = 13;
    this.stepName = "Créez un mot de passe sécurisé";
    this.formDataService.path.previous = "12/phonenumber";
    this.formDataService.path.next = "14/passwordconfirmation";
    this.placeholder = "(ex : AuMoins6Caracteres)";
  }

  ngAfterViewInit(): void {
    this.pwd.nativeElement.focus();
  }
}
