import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';

@Component({
  selector: 'side-information',
  templateUrl: './side-information.component.html',
  styleUrls: ['./side-information.component.css']
})
export class SideInformationComponent extends ProductInformationComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
