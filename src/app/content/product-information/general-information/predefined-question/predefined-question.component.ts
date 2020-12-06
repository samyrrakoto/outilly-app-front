import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
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
  genericQuestions: Array<string> = [];

  constructor(
    private request: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super();
  }

  ngOnInit(): void {
    this.getGenericQuestions()
      .then(() => {
        for (const [index, question] of this.genericQuestions) {
          if (question['answer'] === 'Je vends cet article') {
            this.genericQuestions[index]['answer'] += ' ' + this.sale.product.reservePrice;
          }
        }
      });
  }

  private getGenericQuestions(): Promise<any> {
    return new Promise((resolve) => {
      const response = this.request.getData(this.request.uri.GENERIC_QUESTIONS);

      response.subscribe((res: any) => {
        this.genericQuestions = res;
        resolve();
      });
    });
  }
}
