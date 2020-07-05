import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent extends ProductInformationComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
