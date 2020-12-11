import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Path } from 'src/app/models/Path/path';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnChanges {
  @Input() data: FormDataService;
  @Input() disabledEnterKey: boolean;
  @Input() path: Path;
  @Input() rootUri: string;
  @Input() previousOn: boolean;
  @Input() nextOn: boolean;
  @Input() controls: ValidationErrors = null;
  @Input() additionalControls: boolean = undefined;
  nextCondition: boolean = false;

  constructor(
    public router: Router,
    public formValidator: FormValidatorService)
  {
    this.nextOn = false;
    this.previousOn = false;
  }

  ngOnInit() {
    this.nextCondition = this.additionalControls === undefined
    ? this.controls === null
    : this.controls === null && this.additionalControls;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'nextOn': {
            if (changes.nextOn.currentValue === !changes.nextOn.previousValue) {
              this.next();
            }
            break;
          }
          case 'previousOn': {
            if (changes.previousOn.currentValue === !changes.previousOn.previousValue) {
              this.previous();
            }
            break;
          }
          case 'controls': {
            this.nextCondition = this.getNextCondition();
            break;
          }
          case 'additionalControls': {
            this.nextCondition = this.getNextCondition();
            break;
          }
        }
      }
    }
  }

  public next(): void {
    const path: string = this.rootUri + this.path.next;

    this.nextCondition = this.getNextCondition();

    // Verifying that the field matches the constraints before going further
    if (this.nextCondition) {
      localStorage.setItem('formData', JSON.stringify(this.data));

      if (this.path.current === 'status' && this.data.user.userProfile.type === 'professional') {
        this.goTo('status/company-name');
      }
      else {
        this.router.navigateByUrl(path);
      }
    }
  }

  public previous(): void {
    const path: string = this.rootUri + this.path.previous;

    this.router.navigateByUrl(path);
  }

  public backToProductRecap(): void {
    const path: string = this.rootUri + "announce-overview";

    this.nextCondition = this.getNextCondition();

    // Verifying that the field matches the constraints it gets before going further
    if (this.nextCondition) {
      localStorage.setItem('formData', JSON.stringify(this.data));

      this.router.navigateByUrl(path);
    }
  }

  public backToAccountRecap(): void {
    const path: string = "onboarding/validation";

    this.nextCondition = this.getNextCondition();

    // Verifying that the field matches the constraints it gets before going further
    if (this.nextCondition) {
      localStorage.setItem('formData', JSON.stringify(this.data));

      this.router.navigateByUrl(path);
    }
  }

  public goTo(route: string): void {
    const path: string = this.rootUri + route;

    this.router.navigateByUrl(path);
  }

  private getNextCondition(): boolean {
    return this.additionalControls === undefined
    ? this.controls === null
    : this.controls === null && this.additionalControls;
  }
}
