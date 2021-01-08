import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { PageNameManager } from 'src/app/models/page-name-manager';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  url: string = '';
  user: User;
  activated: boolean = false;
  dashboardTab: string = 'information';
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly menuTabs: Array<string> = ['information', 'activities'];
  readonly pageTitle: string = 'Tableau de bord';

  constructor(
    public userManager: UserManagerService,
    protected request: RequestService,
    public auth: AuthService,
    protected router: Router,
    private location: Location,
    public notification: NotificationService,
    public title: Title)
  {}

  ngOnInit(): void {
    this.userManager.getUserInfos()
      .then(() => {
        this.user = this.userManager.user;
      });
    this.pageNameManager.setTitle(this.pageTitle);
    this.auth.getLogStatus()
      .then(() => {
        this.activated = localStorage.getItem('userStatus') === 'activated';
      });
  }

  ngAfterViewInit(): void {
    this.getUrl();
    this.setFocus(this.getCurrentSection());
  }

  private getCurrentSection(): string {
    if (this.url.includes('/information')) {
      return 'information';
    }
    else if (this.url.includes('/activity-log')) {
      return 'activities';
    }
  }

  private getUrl(): void {
    this.url = this.location.path();
  }

  public logOut(): void {
    this.auth.logout();
  }

  public setFocus(id: string): void {
    for (const tab of this.menuTabs) {
      if (tab !== id) {
        document.getElementById(tab).classList.remove('is-active');
      }
    }

    document.getElementById(id).classList.add('is-active');
  }
}
