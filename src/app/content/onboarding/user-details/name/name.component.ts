import { FormCreatorService } from 'src/app/services/form-creator.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { profileOnboarding } from 'src/app/onboardings';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['../../onboarding.component.css', './name.component.css']
})
export class NameComponent extends StepForm implements OnInit {
  @ViewChild('firstname') firstname: ElementRef;
  user: User = new User();
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public formCreator: FormCreatorService)
  {
    super(profileOnboarding, 'name');
    this.formDataService.fieldName = "name";
    !this.formDataService.user ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepName = "Vos prénom et nom ?";
    this.stepSubtitle = 'Car vous n\'êtes pas un numéro. ;-)';
    this.placeholder = "Bernard";
  }

  ngOnInit(): void {
    this.formCreator.getForm(this.getValidations());
  }

  private getValidations(): any {
    return {
      firstname: [this.user.userProfile.firstname, [Validators.required]],
      lastname: [this.user.userProfile.lastname, [Validators.required]]
    };
  }
}
