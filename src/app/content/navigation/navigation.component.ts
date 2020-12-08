import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnChanges {
  @Input() data: FormDataService;
  @Input() rootUri: string;
  @Input() previousOn: boolean;
  @Input() nextOn: boolean;
  @Input() controls: ValidationErrors;

  constructor(public router: Router,
    public formValidator: FormValidatorService)
  {
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

  public next(): void {
    const path: string = this.rootUri + this.data.path.next;

    // Verifying that the field matches the constraints before going further
    if (this.controls === null) {
      localStorage.setItem('formData', JSON.stringify(this.data));

      if (this.data.path.current === '6/status' && this.data.user.userProfile.type === 'professional') {
        this.goTo('6/status/siret');
      }
      else {
        this.router.navigateByUrl(path);
      }
    }
  }

  public previous(): void {
    const path: string = this.rootUri + this.data.path.previous;

    this.router.navigateByUrl(path);
  }

  public backToProductRecap(): void {
    const path: string = this.rootUri + "announce-overview";

    // Verifying that the field matches the constraints it gets before going further
    if (this.formValidator.verify(this.data)) {
      localStorage.setItem('formData', JSON.stringify(this.data));

      this.router.navigateByUrl(path);
    }
  }

  public backToAccountRecap(): void {
    const path: string = "onboarding/validation";

    // Verifying that the field matches the constraints it gets before going further
    if (this.formValidator.verify(this.data)) {
      localStorage.setItem('formData', JSON.stringify(this.data));

      this.router.navigateByUrl(path);
    }
  }

  public goTo(route: string): void {
    const path: string = this.rootUri + route;

    this.router.navigateByUrl(path);
  }
}
