import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  tab: string = 'personal-information';
  readonly informationTabs: Array<string> = ['personal-information', 'payment-information'];

  constructor(
    protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    public title: Title,
    private location: Location)
  {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.location.path().match('personal-information')) {
      this.setFocus(this.informationTabs, 'personal-information');
    }
    else {
      this.setFocus(this.informationTabs, 'payment-information');
    }
  }

  public setFocus(tabs: Array<string>, id: string): void {
    for (const tab of tabs) {
      if (tab !== id) {
        document.getElementById(tab).classList.remove('is-active');
      }
    }

    document.getElementById(id).classList.add('is-active');
  }
}
