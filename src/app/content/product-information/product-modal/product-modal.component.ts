import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent extends ProductInformationComponent implements OnInit {

  constructor(request: RequestService,
    route: ActivatedRoute,
    bidManager: BidManagerService,
    public auth: AuthService) {
    super(request, route, bidManager, auth);
  }

  ngOnInit(): void {
  }

}
