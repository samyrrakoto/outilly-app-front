import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {isPlatformBrowser} from '@angular/common';
import { pageInfo } from 'src/app/parameters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = pageInfo.BRAND_NAME;
  cookies: boolean;
  faCoffee = faCoffee;
  logged: boolean;
  url: string = '';
  toDisplay: boolean = true;
  toDisplayMenu: boolean = true;
  readonly noHeaderUrl: string[] = ['product/create', 'onboarding'];
  readonly noMenuUrl: string[]= ['home'];
  static isBrowser = new BehaviorSubject<boolean>(null);

  constructor(
    private location: Location,
    private router: Router,
    private auth: AuthService,
    public cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: any)
    {
      AppComponent.isBrowser.next(isPlatformBrowser(platformId));
      const cookieValue: string = localStorage.getItem('cookies') === null ? 'false' : 'true';
      this.cookieService.set('cookies', cookieValue);
    }

  ngOnInit(): void {
    this.auth.getLogStatus()
      .then(() => {
        this.logged = this.auth.accessToken === 'good' && this.auth.logged;
      });
    this.router.events.subscribe({
      next: () => {
        this.getUrl();
        this.isUrlDisablable('noHeaderUrl') ? this.disable('toDisplay') : this.enable('toDisplay');
        this.isUrlDisablable('noMenuUrl') ? this.disable('toDisplayMenu') : this.enable('toDisplayMenu');
      }
    });
  }

  private getUrl(): void {
    this.url = this.location.path();
  }

  private disable(urlsFlagName: string): void {
    this[urlsFlagName] = false;
  }

  private enable(urlsFlagName: string): void {
    this[urlsFlagName] = true;
  }

  private isUrlDisablable(urlsListName: string): boolean {
    for (const url of this[urlsListName]) {
      if (this.url.match(url)) {
        return true;
      }
    }
    return false;
  }
}
