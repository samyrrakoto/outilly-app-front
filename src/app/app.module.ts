import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './header/hero/herohead/menu/menu.component';
import { HeaderComponent } from './header/header.component'
import { HeroComponent } from './header/hero/hero.component';
import { HeroheadComponent } from './header/hero/herohead/herohead.component';
import { HerobodyComponent } from './header/hero/herobody/herobody.component';
import { HomepageComponent } from './content/homepage/homepage.component'
import { NoticeComponent } from './header/notice/notice.component';
import { ContentComponent } from './content/content.component';
import { ProductsComponent } from './content/homepage/products/products.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './content/homepage/search/search.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { OnboardingComponent } from './content/onboarding/onboarding.component';
import { PersonalDetailsComponent } from './content/onboarding/personal-details/personal-details.component';
import { AddressDetailsComponent } from './content/onboarding/address-details/address-details.component';
import { ValidationComponent } from './content/onboarding/validation/validation.component';
import { PseudoComponent } from './content/onboarding/personal-details/pseudo/pseudo.component';
import { FirstNameComponent } from './content/onboarding/personal-details/first-name/first-name.component';
import { LastNameComponent } from './content/onboarding/personal-details/last-name/last-name.component';
import { EmailComponent } from './content/onboarding/personal-details/email/email.component';
import { GenderComponent } from './content/onboarding/personal-details/gender/gender.component';
import { StatusComponent } from './content/onboarding/personal-details/status/status.component';
import { CountryComponent } from './content/onboarding/address-details/country/country.component';
import { ZipcodeComponent } from './content/onboarding/address-details/zipcode/zipcode.component';
import { CityComponent } from './content/onboarding/address-details/city/city.component';
import { StreetComponent } from './content/onboarding/address-details/street/street.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    HeaderComponent,
    HeroComponent,
    HeroheadComponent,
    HerobodyComponent,
    HomepageComponent,
    NoticeComponent,
    ProductsComponent,
    FooterComponent,
    SearchComponent,
    OnboardingComponent,
    PersonalDetailsComponent,
    AddressDetailsComponent,
    ValidationComponent,
    PseudoComponent,
    FirstNameComponent,
    LastNameComponent,
    EmailComponent,
    GenderComponent,
    StatusComponent,
    CountryComponent,
    ZipcodeComponent,
    CityComponent,
    StreetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,    
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far, fab);
  }
}
