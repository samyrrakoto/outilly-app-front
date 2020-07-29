import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'predefined-question',
  templateUrl: './predefined-question.component.html',
  styleUrls: ['./predefined-question.component.scss']
})
export class PredefinedQuestionComponent extends ProductInformationComponent implements OnInit {

  constructor(request: RequestService, route: ActivatedRoute) {
    super(request, route);

    for (const [index, question] of this.genericQuestions) {
      if (question['answer'] === 'Je vends cet article') {
        this.genericQuestions[index]['answer'] += ' ' + this.sale.product.reservePrice;
      }
    }
  }

  ngOnInit(): void {
  }

}
