import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './header/hero/herohead/menu/menu.component';
import { HeaderComponent } from './header/header.component'
import { HeroComponent } from './header/hero/hero.component';
import { HeroheadComponent } from './header/hero/herohead/herohead.component';
import { HerobodyComponent } from './header/hero/herobody/herobody.component';
import { HomepageComponent } from './content/homepage/homepage.component'
import { NoticeComponent } from './header/notice/notice.component';
import { ProductsComponent } from './content/homepage/products/products.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './content/homepage/search/search.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    HeroComponent,
    HeroheadComponent,
    HerobodyComponent,
    HomepageComponent,
    NoticeComponent,
    ProductsComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
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
