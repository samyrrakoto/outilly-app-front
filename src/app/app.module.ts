import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
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
import { ValidationComponent } from './content/onboarding/validation/validation.component';
import { PseudoComponent } from './content/onboarding/user-details/personal-details/pseudo/pseudo.component';
import { FirstNameComponent } from './content/onboarding/user-details/personal-details/first-name/first-name.component';
import { LastNameComponent } from './content/onboarding/user-details/personal-details/last-name/last-name.component';
import { EmailComponent } from './content/onboarding/user-details/personal-details/email/email.component';
import { GenderComponent } from './content/onboarding/user-details/personal-details/gender/gender.component';
import { StatusComponent } from './content/onboarding/user-details/personal-details/status/status.component';
import { CountryComponent } from './content/onboarding/user-details/address-details/country/country.component';
import { ZipcodeComponent } from './content/onboarding/user-details/address-details/zipcode/zipcode.component';
import { CityComponent } from './content/onboarding/user-details/address-details/city/city.component';
import { StreetComponent } from './content/onboarding/user-details/address-details/street/street.component';
import { NavigationComponent } from './content/navigation/navigation.component';
import { PhoneNumberComponent } from './content/onboarding/user-details/personal-details/phone-number/phone-number.component';
import { PasswordComponent } from './content/onboarding/user-details/password/password.component';
import { PasswordconfirmationComponent } from './content/onboarding/user-details/passwordconfirmation/passwordconfirmation.component';
import { BirthdateComponent } from './content/onboarding/user-details/personal-details/birthdate/birthdate.component';
import { EmailOptinComponent } from './content/onboarding/user-details/personal-details/email-optin/email-optin.component';
import { ConfirmationComponent } from './content/onboarding/confirmation/confirmation.component';
import { SiretComponent } from './content/onboarding/user-details/company-details/siret/siret.component';
import { TvaComponent } from './content/onboarding/user-details/company-details/tva/tva.component';
import { StepLabelComponent } from './content/onboarding/step-label/step-label.component';
import { ProductInformationComponent } from './content/product-information/product-information.component';
import { GeneralInformationComponent } from './content/product-information/general-information/general-information.component';
import { SideInformationComponent } from './content/product-information/side-information/side-information.component';
import { AuthorInformationComponent } from './content/product-information/side-information/author-information/author-information.component';
import { Buyingcall2actionComponent } from './content/product-information/side-information/buyingcall2action/buyingcall2action.component';
import { Sellingcall2actionComponent } from './content/product-information/side-information/sellingcall2action/sellingcall2action.component';
import { PaymentinformationComponent } from './content/product-information/side-information/paymentinformation/paymentinformation.component';
import { QuestiontovendorComponent } from './content/product-information/side-information/questiontovendor/questiontovendor.component';
import { ProductModalComponent } from './content/product-information/product-modal/product-modal.component';
import { MediaGalleryComponent } from './content/product-information/general-information/media-gallery/media-gallery.component';
import { PredefinedQuestionComponent } from './content/product-information/general-information/predefined-question/predefined-question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StickyMenuComponent } from './content/product-information/sticky-menu/sticky-menu.component';
import { DeliveryOptionsComponent } from './content/product-information/sticky-menu/delivery-options/delivery-options.component';
import { BuyingConfirmationComponent } from './content/product-information/sticky-menu/buying-confirmation/buying-confirmation.component';
import { BuyingPropositionComponent } from './content/product-information/sticky-menu/buying-proposition/buying-proposition.component';
import { LoginComponent } from './content/login/login.component';
import { UserDashboardComponent } from './content/user-dashboard/user-dashboard.component';
import { AuthHttpInterceptorService } from './services/auth-http-interceptor.service';
import { CheckoutComponent } from './content/checkout/checkout.component';
import { ProductCreationComponent } from './content/product-creation/product-creation.component';
import { AnnouncementTitleComponent } from './content/product-creation/announcement-title/announcement-title.component';
import { MediaUploadComponent } from './content/product-creation/media-upload/media-upload.component';
import { ProductBrandComponent } from './content/product-creation/product-brand/product-brand.component';
import { ProductCategoryComponent } from './content/product-creation/product-category/product-category.component';
import { ProductTypeComponent } from './content/product-creation/product-type/product-type.component';
import { ProductStateComponent } from './content/product-creation/product-state/product-state.component';
import { ProductDescriptionComponent } from './content/product-creation/product-description/product-description.component';
import { ProductZipcodeComponent } from './content/product-creation/product-zipcode/product-zipcode.component';
import { ProductDeliveryComponent } from './content/product-creation/product-delivery/product-delivery.component';
import { ProductWeightComponent } from './content/product-creation/product-weight/product-weight.component';
import { IsWarrantiedComponent } from './content/product-creation/is-warrantied/is-warrantied.component';
import { WarrantyDurationComponent } from './content/product-creation/warranty-duration/warranty-duration.component';
import { DeliveryPriceInformationComponent } from './content/product-creation/delivery-price-information/delivery-price-information.component';
import { VideoUploadComponent } from './content/product-creation/video-upload/video-upload.component';
import { AnnounceKindComponent } from './content/product-creation/announce-kind/announce-kind.component';
import { ReservePriceComponent } from './content/product-creation/reserve-price/reserve-price.component';
import { AccountRequestComponent } from './content/product-creation/account-request/account-request.component';
import { StepProgressComponent } from './content/onboarding/step-progress/step-progress.component';
import { AnnounceOverviewComponent } from './content/product-creation/announce-overview/announce-overview.component';
import { InformationComponent } from './content/user-dashboard/information/information.component';
import { PaymentInformationComponent } from './content/user-dashboard/information/payment-information/payment-information.component';
import { ActivityLogComponent } from './content/user-dashboard/activity-log/activity-log.component';
import { PersonalInformationComponent } from './content/user-dashboard/information/personal-information/personal-information.component';
import { UserSalesComponent } from './content/user-dashboard/activity-log/user-sales/user-sales.component';
import { UserPurchasesComponent } from './content/user-dashboard/activity-log/user-purchases/user-purchases.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { DeliveryInformationComponent } from './content/checkout/delivery-information/delivery-information.component';
import { MondialRelaySelectorComponent } from './content/checkout/delivery-information/mondial-relay-selector/mondial-relay-selector.component';
import { OrderSummaryComponent } from './content/checkout/order-summary/order-summary.component';
import { ProductSummaryComponent } from './content/checkout/order-summary/product-summary/product-summary.component';
import { DeliverySummaryComponent } from './content/checkout/order-summary/delivery-summary/delivery-summary.component';
import { InformationSummaryComponent } from './content/checkout/order-summary/information-summary/information-summary.component';
import { PriceSummaryComponent } from './content/checkout/order-summary/price-summary/price-summary.component';
import { ConditionsOfSaleComponent } from './content/checkout/order-summary/conditions-of-sale/conditions-of-sale.component';
import { PaymentCallToActionComponent } from './content/checkout/order-summary/payment-call-to-action/payment-call-to-action.component';
import { PaymentMeansInformationComponent } from './content/checkout/order-summary/payment-means-information/payment-means-information.component';
import { PaymentReturnComponent } from './content/checkout/payment-process/payment-return/payment-return.component';
import { PhonePipe } from './pipes/phone.pipe';
import { WeightPipe } from './pipes/weight.pipe';
import { RelayHoursPipe } from './pipes/relay-hours.pipe';
import { QualityPipe } from './pipes/quality.pipe';
import { HandDeliveryComponent } from './content/checkout/order-summary/hand-delivery/hand-delivery.component';
import { PaymentDetailsComponent } from './content/checkout/payment-process/payment-details/payment-details.component';
import { PaymentFailedComponent } from './content/checkout/payment-process/payment-failed/payment-failed.component';
import { PaymentConfirmationComponent } from './content/checkout/payment-process/payment-confirmation/payment-confirmation.component';
import { ProductUnavailableComponent } from './content/product-unavailable/product-unavailable.component';
import { AnnouncePipe } from './pipes/announce.pipe';
import { Error404Component } from './content/error404/error404.component';
import { UserSalesConfirmedComponent } from './content/user-dashboard/activity-log/user-sales/user-sales-confirmed/user-sales-confirmed.component';
import { UserSalesRunningComponent } from './content/user-dashboard/activity-log/user-sales/user-sales-running/user-sales-running.component';
import { UserPurchasesConfirmedComponent } from './content/user-dashboard/activity-log/user-purchases/user-purchases-confirmed/user-purchases-confirmed.component';
import { UserPurchasesRunningComponent } from './content/user-dashboard/activity-log/user-purchases/user-purchases-running/user-purchases-running.component';
import { DispatchNoteComponent } from './content/user-dashboard/dispatch-note/dispatch-note.component';
import { DeliveryPipe } from './pipes/delivery.pipe';
import { ProductReferenceComponent } from './content/product-creation/product-reference/product-reference.component';
import { ProductConsumableComponent } from './content/product-creation/product-consumable/product-consumable.component';
import { IncentiveComponent } from './content/homepage/incentive/incentive.component';
import { ProductFilterPipe } from './pipes/product-filter.pipe';

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
    NavigationComponent,
    PhoneNumberComponent,
    PasswordComponent,
    PasswordconfirmationComponent,
    BirthdateComponent,
    EmailOptinComponent,
    ConfirmationComponent,
    SiretComponent,
    TvaComponent,
    StepLabelComponent,
    ProductInformationComponent,
    GeneralInformationComponent,
    SideInformationComponent,
    AuthorInformationComponent,
    Buyingcall2actionComponent,
    Sellingcall2actionComponent,
    PaymentinformationComponent,
    QuestiontovendorComponent,
    ProductModalComponent,
    MediaGalleryComponent,
    PredefinedQuestionComponent,
    StickyMenuComponent,
    DeliveryOptionsComponent,
    BuyingConfirmationComponent,
    BuyingPropositionComponent,
    LoginComponent,
    UserDashboardComponent,
    CheckoutComponent,
    ProductCreationComponent,
    AnnouncementTitleComponent,
    MediaUploadComponent,
    ProductBrandComponent,
    ProductCategoryComponent,
    ProductReferenceComponent,
    ProductTypeComponent,
    ProductStateComponent,
    ProductDescriptionComponent,
    ProductZipcodeComponent,
    ProductDeliveryComponent,
    ProductWeightComponent,
    IsWarrantiedComponent,
    WarrantyDurationComponent,
    DeliveryPriceInformationComponent,
    VideoUploadComponent,
    AnnounceKindComponent,
    ReservePriceComponent,
    AccountRequestComponent,
    StepProgressComponent,
    AnnounceOverviewComponent,
    InformationComponent,
    PaymentInformationComponent,
    ActivityLogComponent,
    PersonalInformationComponent,
    UserSalesComponent,
    UserPurchasesComponent,
    CurrencyPipe,
    DeliveryInformationComponent,
    MondialRelaySelectorComponent,
    OrderSummaryComponent,
    ProductSummaryComponent,
    DeliverySummaryComponent,
    InformationSummaryComponent,
    PriceSummaryComponent,
    ConditionsOfSaleComponent,
    PaymentCallToActionComponent,
    PaymentMeansInformationComponent,
    PaymentReturnComponent,
    PhonePipe,
    WeightPipe,
    RelayHoursPipe,
    QualityPipe,
    HandDeliveryComponent,
    PaymentDetailsComponent,
    PaymentFailedComponent,
    PaymentConfirmationComponent,
    ProductUnavailableComponent,
    AnnouncePipe,
    Error404Component,
    UserSalesConfirmedComponent,
    UserSalesRunningComponent,
    UserPurchasesConfirmedComponent,
    UserPurchasesRunningComponent,
    DispatchNoteComponent,
    DeliveryPipe,
    ProductConsumableComponent,
    IncentiveComponent,
    ProductFilterPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far, fab);
  }
}
