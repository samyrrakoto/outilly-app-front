import { Faq } from 'src/app/models/faq';
import { ProductManagerService } from 'src/app/services/product-manager.service';
import { Component, OnInit, Input } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'predefined-question',
  templateUrl: './predefined-question.component.html',
  styleUrls: ['../../product-information.component.css', './predefined-question.component.scss']
})
export class PredefinedQuestionComponent extends GenericComponent implements OnInit {
  @Input() sale: Sale;
  answeredQuestions: Faq[] = [];
  genericQuestions: Faq[] = [];

  constructor(
    public auth: AuthService,
    public saleManager: SaleManagerService,
    public productManager: ProductManagerService)
  {
    super();
  }

  ngOnInit(): void {
    this.productManager.getGenericQuestions()
      .then((faq: any) => {
        this.genericQuestions = faq;
        this.answeredQuestions = this.productManager.getAnsweredQuestions(this.sale.product.validQuestions);
      });
  }
}
