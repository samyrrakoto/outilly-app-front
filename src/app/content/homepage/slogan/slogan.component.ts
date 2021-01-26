import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slogan',
  templateUrl: './slogan.component.html',
  styleUrls: ['./slogan.component.css']
})
export class SloganComponent implements OnInit {
  readonly placeholder: string = 'Trouver du matériel sur Outilly';

  constructor() { }

  ngOnInit(): void {
  }

}
