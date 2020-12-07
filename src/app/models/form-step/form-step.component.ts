import { Component, OnInit } from '@angular/core';
import { Path } from '../Path/path';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.css']
})
export class FormStepComponent implements OnInit {
  data: any = null;
  stepNb: number = 0;
  fieldName: string = '';
  stepName: string = '';
  stepSubtitle: string = '';
  placeholder: string = '';
  path: Path = new Path();
  errorMessages: Array<string> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
