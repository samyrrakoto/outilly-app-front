import { Component, OnInit, Input } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'predefined-question',
  templateUrl: './predefined-question.component.html',
  styleUrls: ['./predefined-question.component.scss']
})
export class PredefinedQuestionComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;
  @Input() genericQuestions: Array<string>;

  constructor(request: RequestService,
    route: ActivatedRoute,
    bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService) {
    super(request, route, bidManager, saleManager, auth);

    for (const [index, question] of this.genericQuestions) {
      if (question['answer'] === 'Je vends cet article') {
        this.genericQuestions[index]['answer'] += ' ' + this.sale.product.reservePrice;
      }
    }
  }

  ngOnInit(): void {
  }

}
