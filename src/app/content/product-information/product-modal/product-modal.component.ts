import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent extends ProductInformationComponent implements OnInit {

  constructor(request: RequestService, route: ActivatedRoute) {
    super(request, route);
  }

  ngOnInit(): void {
  }

}
