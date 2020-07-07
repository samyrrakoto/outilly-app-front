import { Component, OnInit } from '@angular/core';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'author-information',
  templateUrl: './author-information.component.html',
  styleUrls: ['./author-information.component.css']
})
export class AuthorInformationComponent extends ProductInformationComponent implements OnInit {

  constructor(request: RequestService, route: ActivatedRoute) {
    super(request, route);
  }

  ngOnInit(): void {
  }

}
