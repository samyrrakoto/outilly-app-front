import { BidManagerService } from './../../../../bid-manager.service';
import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'author-information',
  templateUrl: './author-information.component.html',
  styleUrls: ['./author-information.component.css']
})
export class AuthorInformationComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;

  constructor(request: RequestService, route: ActivatedRoute, bidManager: BidManagerService) {
    super(request, route, bidManager);
  }

  ngOnInit(): void {
  }

}
