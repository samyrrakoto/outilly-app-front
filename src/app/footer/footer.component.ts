import { SearchManagerService } from 'src/app/services/search-manager.service';
import { Modals } from 'src/app/models/modals';
import { BrandManagerService } from 'src/app/services/brand-manager.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  modals: Modals = new Modals();
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
    public brandManager: BrandManagerService,
    public searchManager: SearchManagerService)
  {
    this.modals.addModal('contact-form');
  }

  ngOnInit(): void {
    this.brandManager.getBrands();
  }

  public openModal(): void {
    this.click.next();
  }
}
