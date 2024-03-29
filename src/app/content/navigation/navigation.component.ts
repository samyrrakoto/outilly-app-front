import { Router } from '@angular/router';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ValidationErrors } from '@angular/forms';
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
  @Input() externalControl: string;
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

    this.checkValues(path);
  }

  public previous(): void {
    const path: string = this.rootUri + this.path.previous;

    this.router.navigateByUrl(path);
  }

  public backToRecap(path: string) {
    path = this.rootUri + path;
    this.nextCondition = this.getNextCondition();

    this.checkValues(path);
  }

  private checkValues(path: string): void {
    if (this.externalControl) {
      this.formValidator.verify(this.data).then((value: boolean) => {
        if (this.nextCondition && value) {
          localStorage.setItem('formData', JSON.stringify(this.data));

          if (this.data.isProductComplete && this.rootUri === 'product/create/') {
            this.router.navigateByUrl('product/create/announce-overview');
          }
          else if (this.data.isAccountComplete && this.rootUri === '/onboarding/') {
            this.router.navigateByUrl('onboarding/validation');
          }
          else {
            this.router.navigateByUrl(path);
          }
        }
      });
    }
    else {
      if (this.nextCondition) {
        localStorage.setItem('formData', JSON.stringify(this.data));

        if (this.data.isProductComplete && this.rootUri === 'product/create/') {
          this.router.navigateByUrl('product/create/announce-overview');
        }
        else if (this.data.isAccountComplete && this.rootUri === '/onboarding/') {
          this.router.navigateByUrl('onboarding/validation');
        }
        else {
          this.router.navigateByUrl(path);
        }
      }
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

  public isOnboardingComplete(): boolean {
    const accountOnboarding: boolean = this.data.isAccountComplete && this.rootUri === '/onboarding/';
    const productOnboarding: boolean = this.data.isProductComplete && this.rootUri === 'product/create/';

    return accountOnboarding || productOnboarding;
  }
}
