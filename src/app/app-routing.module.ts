import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './content/homepage/homepage.component';
import { OnboardingComponent } from './content/onboarding/onboarding.component';
import { ValidationComponent } from './content/onboarding/validation/validation.component'
import { PseudoComponent } from './content/onboarding/personal-details/pseudo/pseudo.component';
import { EmailComponent } from './content/onboarding/personal-details/email/email.component';
import { FirstNameComponent } from './content/onboarding/personal-details/first-name/first-name.component';
import { LastNameComponent } from './content/onboarding/personal-details/last-name/last-name.component';
import { GenderComponent } from './content/onboarding/personal-details/gender/gender.component';
import { StatusComponent } from './content/onboarding/personal-details/status/status.component';
import { CountryComponent } from './content/onboarding/address-details/country/country.component';
import { ZipcodeComponent } from './content/onboarding/address-details/zipcode/zipcode.component';
import { CityComponent } from './content/onboarding/address-details/city/city.component';
import { StreetComponent } from './content/onboarding/address-details/street/street.component';
import { PhoneNumberComponent } from './content/onboarding/phone-number/phone-number.component';
import { PasswordComponent } from './content/onboarding/password/password.component';
import { PasswordconfirmationComponent } from './content/onboarding/passwordconfirmation/passwordconfirmation.component';
import { BirthdateComponent } from './content/onboarding/birthdate/birthdate.component';
import { EmailOptinComponent } from './content/onboarding/email-optin/email-optin.component';
import { ConfirmationComponent } from './content/onboarding/confirmation/confirmation.component';
import { SiretComponent } from './content/onboarding/siret/siret.component';
import { TvaComponent } from './content/onboarding/tva/tva.component';

const routes: Routes = [
  {
    path:"",
    component: HomepageComponent
  },
  {
    path:"home",
    component: HomepageComponent
  },
  {
    path:"onboarding",
    component: OnboardingComponent,
    children: [
      {
        path:"", redirectTo: '1/username', pathMatch: 'full'
      },
      {
        path:"1/username",
        component: PseudoComponent
      },
      {
        path:"2/email",
        component: EmailComponent
      },
      {
        path:"3/firstname",
        component: FirstNameComponent
      },
      {
        path:"4/lastname",
        component: LastNameComponent
      },
      {
        path:"5/gender",
        component: GenderComponent
      },
      {
        path:"6/status",
        component: StatusComponent,
      },
      {
        path:"6/status/siret",
        component: SiretComponent
      },
      {
        path:"6/status/tva",
        component: TvaComponent
      },
      {
        path:"7/birthdate",
        component: BirthdateComponent
      },
      {
        path:"8/country",
        component: CountryComponent
      },
      {
        path:"9/zipcode",
        component: ZipcodeComponent
      },
      {
        path:"10/city",
        component: CityComponent
      },
      {
        path:"11/street",
        component: StreetComponent
      },
      {
        path:"12/phonenumber",
        component: PhoneNumberComponent
      },
      {
        path:"13/password",
        component: PasswordComponent
      },
      {
        path:"14/passwordconfirmation",
        component: PasswordconfirmationComponent
      },
      {
        path:"15/emailoptin",
        component: EmailOptinComponent
      },
      {
        path:"validation",
        component: ValidationComponent
      },
      {
        path:"confirmation",
        component: ConfirmationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
