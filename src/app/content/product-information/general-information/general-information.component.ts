import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent extends ProductInformationComponent implements OnInit {

  @Input('sale') sale: Sale;

  constructor(request: RequestService) {
    super(request);
  }

  ngOnInit(): void {
  }

}
