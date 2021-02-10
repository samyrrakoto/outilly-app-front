import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  readonly root: string = 'product/create/';

  constructor(
    public title: Title)
  {}

  ngOnInit(): void {
  }
}
