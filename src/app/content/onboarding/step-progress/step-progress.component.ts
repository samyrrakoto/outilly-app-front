import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.css']
})
export class StepProgressComponent implements OnInit {
  @Input() totalNbSteps: number;
  @Input() stepNb: number;

  constructor() { }

  ngOnInit(): void {}

}
