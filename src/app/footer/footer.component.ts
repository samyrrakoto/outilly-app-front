import { Router } from '@angular/router';
import { BrandManagerService } from './../services/brand-manager.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  readonly footerBrands: string[] = [
    'Facom',
    'BOSCH',
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

  constructor(
    public brandManager: BrandManagerService)
  {
  }

  ngOnInit(): void {
    this.brandManager.getBrands();
  }
}
