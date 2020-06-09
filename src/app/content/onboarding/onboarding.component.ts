import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
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

  next(): void {
    let path = this.root + this.nextPath;
    this.router.navigateByUrl(path);
  }

  previous(): void {
    let path = this.root + this.previousPath;
    this.router.navigateByUrl(path);
  }

  goTo(route: string): void {
    let path = this.root + route;
    this.router.navigateByUrl(path);
  }
}

