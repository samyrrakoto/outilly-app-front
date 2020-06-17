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
  stepNb: number;
  stepName: string;
  placeholderText: string;
  currentPath: string;
  previousPath: string;
  nextPath: string;
  isMandatory: boolean;
  readonly root = "onboarding/";

  constructor(public formDataService: FormDataService, public router: Router)
  {
    this.user = new User();
    this.stepNb = 0;
    this.stepName = "";
    this.placeholderText = "";
    this.currentPath = "";
    this.previousPath = "";
    this.nextPath = "";
    this.isMandatory = true;
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

  onKeyNext(event: any) {
    this.next();
  }

  onKeyPrevious(event: any) {
    this.previous();
  }
}

