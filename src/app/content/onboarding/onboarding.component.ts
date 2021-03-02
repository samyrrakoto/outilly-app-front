import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Path } from 'src/app/models/Path/path';
import { User } from 'src/app/models/user';
import { FormDataService } from 'src/app/services/form-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  user: User;
  stepNb: number;
  stepName: string;
  placeholder: string;
  path: Path;
  isMandatory: boolean;
  errorMessages: Array<string>;
  nextOn: boolean;
  previousOn: boolean;
  readonly root: string = 'onboarding/';

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    private auth: AuthService,
    public formValidator: FormValidatorService)
  {
    this.user = new User();
    this.stepNb = 0;
    this.stepName = '';
    this.placeholder = 'Ecrivez ici';
    this.path = new Path();
    this.isMandatory = true;
    this.errorMessages = [];
  }

  ngOnInit(): void {
    this.previousOn = false;
    this.nextOn = false;
    if (this.auth.isLogged() && this.auth.isUserCompleted()) {
      this.router.navigate(["/user/dashboard"]);
    }
  }
}

