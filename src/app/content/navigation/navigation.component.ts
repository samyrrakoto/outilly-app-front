import { Router } from '@angular/router';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnChanges {
  @Input() data: any;
  @Input() rootUri: string;
  @Input() previousOn: boolean;
  @Input() nextOn: boolean;

  constructor(public formData: FormDataService, public router: Router, public formValidator: FormValidatorService) {
    this.nextOn = false;
    this.previousOn = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'nextOn': {
            if (changes.nextOn.currentValue === !changes.nextOn.previousValue) {
              this.next();
            };
            break;
          }
          case 'previousOn': {
            if (changes.previousOn.currentValue === !changes.previousOn.previousValue) {
              this.previous();
            };
            break;
          }
        }
      }
    }
  }

  next(): void {
    const path: string = this.rootUri + this.formData.path.next;

    // Verifying that the field matches the constraints before going further
    if (this.formValidator.verify(this.formData)) {
      localStorage.setItem('formData', JSON.stringify(this.formData));

      if (this.formData.path.current === '6/status' && this.formData.user.userProfile.type === 'professional') {
        this.goTo('6/status/siret');
      }
      else {
        this.router.navigateByUrl(path);
      }
    }
  }

  backToProductRecap(): void {
    const path: string = this.rootUri + "announce-overview";

    // Verifying that the field matches the constraints it gets before going further
    if (this.formValidator.verify(this.formData)) {
      localStorage.setItem('formData', JSON.stringify(this.formData));

      this.router.navigateByUrl(path);
    }
  }

  backToAccountRecap(): void {
    const path: string = "onboarding/validation";

    // Verifying that the field matches the constraints it gets before going further
    if (this.formValidator.verify(this.formData)) {
      localStorage.setItem('formData', JSON.stringify(this.formData));

      this.router.navigateByUrl(path);
    }
  }

  previous(): void {
    const path = this.rootUri + this.formData.path.previous;

    this.router.navigateByUrl(path);
  }

  goTo(route: string): void {
    const path = this.rootUri + route;

    this.router.navigateByUrl(path);
  }
}
