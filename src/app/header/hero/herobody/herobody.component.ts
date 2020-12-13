import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-herobody',
  templateUrl: './herobody.component.html',
  styleUrls: ['./herobody.component.css']
})
export class HerobodyComponent implements OnInit {
  @Input() logged: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
