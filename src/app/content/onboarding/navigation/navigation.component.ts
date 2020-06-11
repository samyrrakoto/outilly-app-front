import { Component, Input } from '@angular/core';
import { OnboardingComponent } from '../onboarding.component';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent extends OnboardingComponent {
  @Input() localNextPath: string;
  @Input() localPreviousPath: string;
  @Input() localCurrentPath: string;
  @Input() localModelName: string;
  @Input() localType: string;

  constructor(formDataService: FormDataService, router: Router) {
    super(formDataService, router);
    this.localNextPath = "";
    this.localPreviousPath = "";
    this.localCurrentPath = "";
    this.localModelName = "";
    this.localType = "";
  }

  next(): void {
    let path = this.root + this.localNextPath;

    if (this.localCurrentPath == "6/status" && this.localType == "professional")
      path = this.root + "6/status/siret";
    this.router.navigateByUrl(path);
  }

  previous(): void {
    let path = this.root + this.localPreviousPath;
    this.router.navigateByUrl(path);
  }
}
