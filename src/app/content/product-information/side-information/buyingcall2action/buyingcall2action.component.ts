import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'buying-call-2-action',
  templateUrl: './buyingcall2action.component.html',
  styleUrls: ['./buyingcall2action.component.css']
})
export class Buyingcall2actionComponent extends ProductInformationComponent implements OnInit {

  constructor(request: RequestService, route: ActivatedRoute) {
    super(request, route);
  }

  ngOnInit(): void {
  }

}
