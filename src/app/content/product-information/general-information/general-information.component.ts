import { Address } from 'src/app/models/address';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { ArrayToolbox } from 'src/app/models/array-toolbox';
import { staticStates } from 'src/app/parameters';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { GenericComponent } from 'src/app/models/generic-component';

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
  userLocality: string = '';
  arrayToolbox: ArrayToolbox = new ArrayToolbox();
  readonly states: string[] = staticStates;
  readonly maxVisibleLength: number = 255;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userManager: UserManagerService)
  {
    super();
    this.userManager.getUserAddress()
      .then((address: Address) => { this.userLocality = address.zipcode });
    this.modals.addModal('knowMore');
  }

  ngOnInit(): void {}

  public displayDescription(): void {
    this.descriptionFlag ? this.descriptionFlag = false : this.descriptionFlag = true;
  }

  public getMapUrl(): string {
    if (this.auth.isLogged() && this.userLocality !== '') {
      return 'https://www.google.fr/maps/dir/' + this.userLocality + '/' + this.sale.product.locality;
    }
    else {
      return 'https://www.google.fr/maps/place/' + this.sale.product.locality;
    }
  }

  public goToBrandProduct(brandId: number): void {
    this.router.navigate(['/products/brand/' + brandId.toString()]);
  }
}
