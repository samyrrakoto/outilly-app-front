import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['../product-information.component.css', './general-information.component.css']
})
export class GeneralInformationComponent extends GenericComponent implements OnInit {
  @Input() sale: Sale;
  @Input() genericQuestions: Array<string>;
  isShortenable: boolean;
  descriptionFlag: boolean = false;
  mapUrl: string = '';
  modals: Modals;
  readonly maxVisibleLength: number = 255;

  constructor(public request: RequestService,
    public router: Router,
    route: ActivatedRoute,
    public bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super();
    this.modals = new Modals();
    this.modals.addModal('knowMore');
  }

  ngOnInit(): void {}

  public displayDescription(): void {
    this.descriptionFlag ? this.descriptionFlag = false : this.descriptionFlag = true;
  }

  public getMapUrl(): string {
    return 'http://google.fr/maps/place/' + this.sale.product.locality;
  }
}
