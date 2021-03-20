import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent extends GenericComponent implements OnInit {
  @ViewChild('search') currentSearch: ElementRef;
  @Input() placeholder: string = 'Rechercher un produit';
  @Input() searchTitle: string = 'Rechercher';
  @Input() buttonHidden: boolean = false;
  zipcode: string = '';
  filters: string = '';
  radius: number = 20;

  constructor(
    private router: Router
  ) {
    super();
    this.modals.addModal('fake-filters');
  }

  ngOnInit(): void {
  }

  public goToSearch(search: string): void {
    this.router.navigate(['/search'],
    {
      queryParams: this.createQueryParams(search)
    });
  }

  private createQueryParams(search: string): any {
    const queryParams: any = {
      query: search,
      filters: this.filters,
      zipcode: this.zipcode,
      radius: this.radius
    };

    return this.cleanQueryParams(queryParams);
  }

  private cleanQueryParams(params: any): any {
    for (const prop in params) {
      if (!params[prop]) {
        delete params[prop];
      }
    }
    return params;
  }

  public onKey(event: KeyboardEvent, search: string): void {
    if (event.key === 'Enter') {
      this.goToSearch(search);
    }
  }

  public getFiltersEmitter(filters: string): void {
    this.filters = filters;
  }

  public getSearchLaunchEmitter(query: string): void {
    this.goToSearch(query);
  }

  public getZipcodeEmitter(zipcode: string): void {
    this.zipcode = zipcode;
  }

  public getRadiusEmitter(radius: number): void {
    this.radius = radius;
  }
}
