import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.css']
})
export class StepProgressComponent implements OnInit {
  @Input() stepNb: number;
  @Input() nbStep: number;

  constructor() { }

  ngOnInit(): void {}

}
