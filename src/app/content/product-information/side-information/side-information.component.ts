import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'side-information',
  templateUrl: './side-information.component.html',
  styleUrls: ['../product-information.component.css', './side-information.component.css']
})
export class SideInformationComponent extends GenericComponent implements OnInit {
  @Input() sale: Sale;
  @Input() isSeller: boolean;
  @Input() mrCosts: number;
  @Input() isAvailable: boolean;
  @Input() priceToPay: number;
  @Output() openState = new EventEmitter<boolean>();

  constructor(
    public auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super();
  }

  ngOnInit(): void {}

  emitOpenState(state: boolean) {
    this.openState.emit(state);
  }
}
