import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  res: any;
  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.getUserInfos();
  }

  getUserInfos(){
    this.request.getUserInfos().subscribe(result => {
      this.res = result;
      console.log(result);
      console.log(this.res);
    })
  }
}
