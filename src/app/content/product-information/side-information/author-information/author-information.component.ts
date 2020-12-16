import { Modals } from 'src/app/models/modals';
import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'author-information',
  templateUrl: './author-information.component.html',
  styleUrls: ['../../product-information.component.css', './author-information.component.css']
})
export class AuthorInformationComponent extends GenericComponent implements OnInit {
  @Input() sale: Sale;
  modals: Modals = new Modals();

  constructor(
    private request: RequestService,
    private router: Router)
  {
    super();
  }

  ngOnInit(): void {
  }

  public goToSellerProducts(): void {
    this.router.navigate(['/seller-products/' + this.sale.seller.id]);
  }
}
