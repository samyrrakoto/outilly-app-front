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
  user: User;
  step: number;
  previousPath: string;
  nextPath: string;
  filled: boolean;
  readonly root = "onboarding/";

  constructor(public formDataService : FormDataService, public router : Router)
  {
    this.user = new User();
    this.step = 0;
    this.previousPath = "";
    this.nextPath = "";
    this.filled = false;
  }

  ngOnInit(): void {
  }

  next(): void
  {
    let path = this.root + this.nextPath;
    this.router.navigateByUrl(path);
  }

  previous(): void
  {
    let path = this.root + this.previousPath;
    this.router.navigateByUrl(path);
  }
}
