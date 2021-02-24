import { country } from 'src/app/parameters';
import { Validators } from '@angular/forms';
import { FormCreatorService } from 'src/app/services/form-creator.service';
import { Component, OnInit } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { profileOnboarding } from 'src/app/onboardings';
import { FormDataService } from 'src/app/services/form-data.service';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['../../onboarding.component.css', './address.component.css']
})
export class AddressComponent extends StepForm implements OnInit {
  user: User = new User();
  countriesAccepted: any[] = country.COUNTRIES_ACCEPTED;

  constructor(
    public formData: FormDataService,
    public formCreator: FormCreatorService,
    private regex: RegexTemplateService)
  {
    super(profileOnboarding, 'address');
    !this.formData.user ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.stepName = "Où habitez-vous ?";
  }

  ngOnInit(): void {
    this.formCreator.getForm(this.getVerifications());
  }

  private getVerifications(): any {
    return {
      country: [this.user.userProfile.mainAddress.country, [Validators.required]],
      zipcode: [this.user.userProfile.mainAddress.zipcode, [Validators.required, Validators.pattern(this.regex.ZIPCODE)]],
      city: [this.user.userProfile.mainAddress.city, [Validators.required]],
      line1: [this.user.userProfile.mainAddress.line1, [Validators.required]]
    };
  }
}
