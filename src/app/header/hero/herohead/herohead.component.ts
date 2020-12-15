import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-herohead',
  templateUrl: './herohead.component.html',
  styleUrls: ['./herohead.component.css']
})
export class HeroheadComponent implements OnInit {
  @Input() toDisplayMenu: boolean;
  @Input() logged: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
