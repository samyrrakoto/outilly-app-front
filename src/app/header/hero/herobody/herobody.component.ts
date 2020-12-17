import { pageInfo } from 'src/app/parameters';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-herobody',
  templateUrl: './herobody.component.html',
  styleUrls: ['./herobody.component.css']
})
export class HerobodyComponent implements OnInit {
  readonly brandName: string = pageInfo.BRAND_NAME;
  @Input() logged: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
