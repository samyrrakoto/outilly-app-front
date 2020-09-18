import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any;

  constructor(private request: RequestService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserInfos();
  }

  ngAfterViewChecked(): void {
    console.log(this.user.userProfile.firstname);
  }

  private getUserInfos(): void {
    this.request.getUserInfos().subscribe(result => {
      this.user = result;
    });
  }

  public logOut(): void {
    this.auth.logout();
  }

  public setFocus(id: string): void {
    const tabs: Array<string> = ['information', 'payment', 'sale'];

    for (const tab of tabs) {
      if (tab !== id) {
        document.getElementById(tab).classList.remove('is-active');
      }
    }

    document.getElementById(id).classList.add('is-active');
  }
}
