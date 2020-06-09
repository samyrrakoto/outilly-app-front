import { Component, Input } from '@angular/core';
import { OnboardingComponent } from '../onboarding.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent extends OnboardingComponent {
  @Input() localNextPath : string;
  @Input() localPreviousPath : string;

  next(): void {
    let path = this.root + this.localNextPath;
    this.router.navigateByUrl(path);
  }

  previous(): void {
    let path = this.root + this.localPreviousPath;
    this.router.navigateByUrl(path);
  }
}
