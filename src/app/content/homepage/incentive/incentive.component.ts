import { pageInfo } from 'src/app/parameters';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.component.html',
  styleUrls: ['./incentive.component.css']
})
export class IncentiveComponent implements OnInit {
  readonly brandName: string = pageInfo.BRAND_NAME;

  constructor() { }

  ngOnInit(): void {}
}
