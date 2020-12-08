import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
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
