import { CategoryService } from 'src/app/services/category.service';
import { Modals } from 'src/app/models/modals';
import { BrandManagerService } from 'src/app/services/brand-manager.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { staticLinks } from 'src/app/parameters';

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
  blogUri = staticLinks.BLOG_URI;

  constructor(
    public brandManager: BrandManagerService,
    public categoryService: CategoryService)
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
