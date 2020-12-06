import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  @Input() url: string;
  @Input() user: User;
  @Input() birthdate: string;
  tab: string = 'personal-information';
  readonly informationTabs: Array<string> = ['personal-information', 'payment-information'];

  constructor(
    protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    public title: Title)
  {}

  ngOnInit(): void {
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
