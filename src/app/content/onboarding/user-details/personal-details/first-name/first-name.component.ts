import { Component, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './first-name.component.css']
})
export class FirstNameComponent extends OnboardingComponent implements OnChanges {
  @ViewChild('firstName') firstName: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = "firstName";
    this.user = formDataService.user;
    this.stepNb = 3;
    this.stepName = "Quel est votre prénom ?";
    this.formDataService.path.previous = "2/email";
    this.formDataService.path.next = "4/lastname";
    this.placeholder = "(ex : Jean Marc)";
  }

  ngOnChanges() {}

  ngAfterViewInit(): void {
    this.firstName.nativeElement.focus();
  }
}
