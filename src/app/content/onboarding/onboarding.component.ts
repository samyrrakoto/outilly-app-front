import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Path } from 'src/app/models/Path/path';

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
  ngModelName: string;
  path: Path;
  isMandatory: boolean;
  errorMessages: Array<string>;
  readonly root = 'onboarding/';

  constructor(public formDataService: FormDataService, public router: Router, public formValidator: FormValidatorService)
  {
    this.user = new User();
    this.stepNb = 0;
    this.stepName = '';
    this.placeholder = 'Ecrivez ici';
    this.ngModelName = '';
    this.path = new Path();
    this.isMandatory = true;
    this.errorMessages = [];
  }

  ngOnInit(): void {}

  next(): void {
    const path = this.root + this.formDataService.path.next;

    // Verifying that the field matches the constraints it gets before going further
    if (this.formValidator.verify(this.formDataService)) {
      if (this.formDataService.path.current === '6/status' && this.formDataService.user.userProfile.type === 'professional') {
        this.goTo('6/status/siret');
      }
      else {
        this.router.navigateByUrl(path);
      }
    }
  }

  previous(): void {
    const path = this.root + this.formDataService.path.previous;

    this.router.navigateByUrl(path);
  }

  goTo(route: string): void {
    const path = this.root + route;

    this.router.navigateByUrl(path);
  }

  // Keyboard shortcuts
  onKey(event: KeyboardEvent): void {
    if ((event.shiftKey && event.key === 'ArrowRight') || (event.key === 'Enter')) {
      this.next();
    }
    else if (event.shiftKey && event.key === 'ArrowLeft') {
      this.previous();
    }
  }
}

