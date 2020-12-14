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
  faCoffee = faCoffee;
  url: string = '';
  toDisplay: boolean = true;
  readonly noHeaderUrl: string[] = ['product/create', 'onboarding'];
  static isBrowser = new BehaviorSubject<boolean>(null);


  constructor(
    private location: Location,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any)
    {
      AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    }

  ngOnInit(): void {
    this.router.events.subscribe({
      next: () => {
        this.getUrl();

        if (this.isUrlDisablable()) {
          this.disable();
        }
        else {
          this.enable();
        }
      }
    });
  }

  private getUrl(): void {
    this.url = this.location.path();
  }

  private disable(): void {
    this.toDisplay = false;
  }

  private enable(): void {
    this.toDisplay = true;
  }

  private isUrlDisablable(): boolean {
    for (const url of this.noHeaderUrl) {
      if (this.url.match(url)) {
        return true;
      }
    }
    return false;
  }
}
