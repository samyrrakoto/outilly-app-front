import { Component, Inject, forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectSearchBox } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'app-custom-search-box',
  templateUrl: './custom-search-box.component.html',
  styleUrls: ['./custom-search-box.component.css']
})
export class CustomSearchBoxComponent extends BaseWidget {
  @ViewChild('input') input: ElementRef;
  @Input() initialQuery: string;
  public state: {
    query: string;
    refine: Function;
    clear: Function;
    isSearchStalled: boolean;
    widgetParams: object;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  )
  {
    super('SearchBox');
  }

  ngOnInit(): void {
    this.createWidget(connectSearchBox, {
      queryHook(query: string, search: any) {
        search(query);
      }
    });
    super.ngOnInit();
  }
}
