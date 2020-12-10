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
  url: string = '';
  toDisplay: boolean = true;
  readonly noHeaderUrl: string[] = ['product/create', 'onboarding'];

  constructor(
    private location: Location,
    private router: Router) {}

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
