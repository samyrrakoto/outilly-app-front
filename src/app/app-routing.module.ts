import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './content/homepage/homepage.component';
import { OnboardingComponent } from './content/onboarding/onboarding.component';
import { AddressDetailsComponent } from './content/onboarding/address-details/address-details.component';
import { PersonalDetailsComponent } from './content/onboarding/personal-details/personal-details.component';
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
        path:"", redirectTo: 'pseudo', pathMatch: 'full'
      },
      {
        path:"pseudo",
        component: PseudoComponent
      },
      {
        path:"email",
        component: EmailComponent
      },
      {
        path:"firstname",
        component: FirstNameComponent
      },
      {
        path:"lastname",
        component: LastNameComponent
      },
      {
        path:"gender",
        component: GenderComponent
      },
      {
        path:"status",
        component: StatusComponent
      },
      {
        path:"country",
        component: CountryComponent
      },
      {
        path:"zipcode",
        component: ZipcodeComponent
      },
      {
        path:"city",
        component: CityComponent
      },
      {
        path:"street",
        component: StreetComponent
      },
      {
        path:"validation",
        component: ValidationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
