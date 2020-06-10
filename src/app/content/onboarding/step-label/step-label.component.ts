import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-label',
  templateUrl: './step-label.component.html',
  styleUrls: ['../../onboarding/onboarding.component.css', './step-label.component.css']
})
export class StepLabelComponent {
  @Input() stepNb: number;
  @Input() stepName: string;
  @Input() isMandatory: boolean;

  constructor() {
    this.stepNb = 0;
    this.stepName = "";
    this.isMandatory = true;
  }
}
