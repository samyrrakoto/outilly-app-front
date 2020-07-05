import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';

@Component({
  selector: 'general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent extends ProductInformationComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
