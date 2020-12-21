import { BrandManagerService } from 'src/app/services/brand-manager.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

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
  click: Subject<any> = new Subject<any>();

  constructor(
    public brandManager: BrandManagerService)
  {
  }

  ngOnInit(): void {
    this.brandManager.getBrands();
  }

  public openModal(): void {
    this.click.next();
  }
}
