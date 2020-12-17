import { pageInfo } from 'src/app/parameters';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  readonly brandName: string = pageInfo.BRAND_NAME;

  constructor() { }

  ngOnInit(): void {
  }

}
