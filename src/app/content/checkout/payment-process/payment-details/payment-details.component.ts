import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import { OrderManagerService } from 'src/app/services/order-manager.service';
import { PaymentValidatorService } from 'src/app/services/payment-validator.service';
import { Component, OnInit } from '@angular/core';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { PageNameManager } from 'src/app/models/page-name-manager';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  form: FormGroup;
  cardOwner: string;
  cardNumber: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCvx: string;
  testCard: boolean = environment.testCard;
  saleId: string;
  orderPrice: number = 0;
  loading: boolean;
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly pageTitle: string = 'Paiement';

  constructor(
    private auth: AuthService,
    public paymentValidator: PaymentValidatorService,
    public saleManager: SaleManagerService,
    private orderManager: OrderManagerService,
    public payment: PaymentService,
    private formBuilder: FormBuilder,
    private title: Title)
  {
    this.cardOwner = '';
    this.cardNumber = '';
    this.cardExpirationMonth = '';
    this.cardExpirationYear = '';
    this.cardCvx = '';
    this.loading = false;
  }

  ngOnInit(): void {
    this.getForm();
    this.pageNameManager.setTitle(this.pageTitle);
    this.payment.saleId = parseInt(localStorage.getItem('saleId'));
    this.auth.getLogStatus()
      .then(() => {
        if (this.auth.isLogged()) {
          return this.getOrderPriceById(parseInt(sessionStorage.getItem('orderId')));
        }
      })
      .then(() => this.saleManager.getSaleAvailability(this.payment.saleId))
      .then((isAvailable: boolean) => {
        return new Promise<void>((resolve, reject) => {
          if (!isAvailable) {
            reject('ProductUnavailable');
          }
          else {
            resolve();
          }
        });
      })
      .then(() => {
        return new Promise<void>((resolve, reject) => {
          this.auth.isLogged() ? resolve() : reject('Login');
        });
      })
      .then(() => { this.payment.preregister() })
      .catch((error: any) => { this.payment.handleErrors(error) });
  }

  private getOrderPriceById(orderId: number): Promise<void> {
    return new Promise((resolve) => {
      this.orderManager.getOrderById(orderId).subscribe(
        (order: any) => {
          this.orderPrice = order.amountTotal;
          resolve();
        }
      )
    });
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      cardOwner: [this.payment.cardOwner, [Validators.required, Validators.pattern(/^[a-zA-Zéèêîôû ]+$/)]],
      cardNumber: [this.payment.cardNumber, [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      cardExpirationMonth : [this.payment.cardExpirationMonth, [Validators.required, Validators.pattern(/^(0[1-9])|(1[0-2])$/)]],
      cardExpirationYear: [this.payment.cardExpirationYear, [Validators.required, Validators.pattern(/^2[0-9]$/)]],
      cardCvx: [this.payment.cardCvx, [Validators.required, Validators.pattern(/^[0-9]{3}$/)]]
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
