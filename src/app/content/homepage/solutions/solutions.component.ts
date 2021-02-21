import { Component, OnInit } from '@angular/core';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {
  modals: Modals = new Modals();

  constructor() {
    this.modals.addModal('b2b-form');
  }

  ngOnInit(): void {
  }

}
