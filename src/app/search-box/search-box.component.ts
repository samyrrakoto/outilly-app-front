import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public goToSearch(search: string): void {
    this.router.navigate(['/search'],
    {
      queryParams: {
        query: search
      }
    });
  }

  public onKey(event: KeyboardEvent, search: string): void {
    if (event.key === 'Enter') {
      this.goToSearch(search);
    }
  }
}
