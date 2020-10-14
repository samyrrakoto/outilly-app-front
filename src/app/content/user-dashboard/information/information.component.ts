import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { RequestService } from './../../../services/request.service';
import { UserDashboardComponent } from './../user-dashboard.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent extends UserDashboardComponent implements OnInit {
  readonly informationTabs: Array<string> = ['personal-information', 'payment-information'];

  constructor(protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute) {
    super(request, auth, router);
  }

  ngOnInit(): void {
    this.getUrl();
  }

  private getUrl(): void {
    this.route.url.subscribe((url: any) => {
      this.url = url[0].path;

      if (this.url === 'information') {
        this.setFocus(this.menuTabs, 'information');
      }
    });
  }
}
