import { Modals } from 'src/app/models/modals';
import { pageInfo } from 'src/app/parameters';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  readonly brandName: string = pageInfo.BRAND_NAME;
  modals: Modals = new Modals();
  click: Subject<any> = new Subject<any>();

  constructor() {
    this.modals.addModal('contact-form');
  }

  ngOnInit(): void {
  }

  public openModal(): void {
    this.click.next();
  }
}
