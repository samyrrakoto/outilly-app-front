import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : User;
  readonly root = "onboarding/";

  constructor(public formDataService : FormDataService, public router : Router)
  {
  }

  ngOnInit(): void {
  }

  goTo(route : string)
  {
    let path = this.root + route;
    this.router.navigateByUrl(path);
  }
}
