import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  readonly footerBrands: string[] = [
    'Facom',
    'Bosch',
    'Milwaukee',
    'Makita',
    'Tubesca',
    'Hikoki',
    'Dexter',
    'Magnusson',
    'DeWalt',
    'Gardena'
  ];
  @Input() toDisplay: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
