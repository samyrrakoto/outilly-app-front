import { Router, ActivatedRoute } from '@angular/router';
import { UserDashboardComponent } from './../user-dashboard.component';
import { AuthService } from './../../../services/auth.service';
import { RequestService } from './../../../services/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['../user-dashboard.component.css', './activity-log.component.css']
})
export class ActivityLogComponent extends UserDashboardComponent implements OnInit {
  readonly activityTabs: Array<string> = ['user-sales', 'user-purchases'];

  constructor(protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute) {
      super(request, auth, router);
    }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      this.url = url[0].path;

      if (this.url === 'activity-log') {
        this.setFocus(this.menuTabs, 'activities');
      }
    });
  }
}
