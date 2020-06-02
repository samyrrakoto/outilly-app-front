import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './content/homepage/homepage.component';
import { OnboardingComponent } from './content/onboarding/onboarding.component';
import { AddressDetailsComponent } from './content/onboarding/address-details/address-details.component';
import { PersonalDetailsComponent } from './content/onboarding/personal-details/personal-details.component';
import { ValidationComponent } from './content/onboarding/validation/validation.component'

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
        path:"", redirectTo: 'personaldetails', pathMatch: 'full'
      },
      {
        path:"addressdetails",
        component: AddressDetailsComponent
      },
      {
        path:"personaldetails",
        component: PersonalDetailsComponent
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
