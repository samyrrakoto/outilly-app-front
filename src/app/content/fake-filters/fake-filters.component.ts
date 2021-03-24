import { toolsAndMachines } from 'src/app/parameters';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchQuery } from 'src/app/models/search-query';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-fake-filters',
  templateUrl: './fake-filters.component.html',
  styleUrls: ['./fake-filters.component.css']
})
export class FakeFiltersComponent implements OnInit {
  @Input() query: string;
  @Input() placeholder: string;
  @Output() filters: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchLaunch: EventEmitter<string> = new EventEmitter<string>();
  @Output() zipcode: EventEmitter<string> = new EventEmitter<string>();
  @Output() radius: EventEmitter<number> = new EventEmitter<number>();
  readonly toolsAndMachines: string[] = toolsAndMachines;
  searchQuery: SearchQuery = new SearchQuery(this.geoService);

  constructor(
    private geoService: GeoService
  ) {
  }

  ngOnInit(): void {
  }

  public updateFilters(): void {
    this.filters.emit(this.searchQuery.filters.getAll(true));
  }

  public launchSearch(query: string): void {
    this.searchLaunch.emit(query);
  }

  public updateZipcode(zipcode: string): void {
    this.zipcode.emit(zipcode);
  }

  public updateRadius(radius: number): void {
    this.radius.emit(radius);
  }
}
