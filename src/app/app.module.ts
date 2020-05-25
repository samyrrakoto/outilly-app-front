import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { HeroheadComponent } from './herohead/herohead.component';
import { HerobodyComponent } from './herobody/herobody.component';
import { NoticeComponent } from './notice/notice.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    HeroheadComponent,
    HerobodyComponent,
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
export class AppModule { }
