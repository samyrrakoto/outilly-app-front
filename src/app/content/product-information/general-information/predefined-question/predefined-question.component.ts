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
  questions: Array<string> = [
    "Quel est le prix de cet objet ?",
    "Le prix est-il négociable ?",
    "Le lot est-il 100% fonctionnel ?",
    "Où se trouve le produit pour le récupérer en mains propres ?"];
  answers: Array<string> = [
    "Je vends cet article 140€ TTC.",
    "Peut-être.",
    "Ca dépend.",
    "Oui"
  ];

  constructor(request: RequestService, route: ActivatedRoute) {
    super(request, route);
  }

  ngOnInit(): void {
  }

}
