import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  faCoffee = faCoffee;
  logged: boolean;
  url: string = '';
  toDisplay: boolean = true;
  toDisplayMenu: boolean = true;
  readonly noHeaderUrl: string[] = ['product/create', 'onboarding'];
  readonly noMenuUrl: string[]= ['home'];

  constructor(
    private location: Location,
    private router: Router,
    private auth: AuthService) {}

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
