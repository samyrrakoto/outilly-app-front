import { UrlService } from 'src/app/services/url.service';
import { Component, OnInit } from '@angular/core';
import { Modals } from 'src/app/models/modals';
import { QueryParamService } from 'src/app/services/query-param.service';

@Component({
  selector: 'app-construction-call-to-action',
  templateUrl: './construction-call-to-action.component.html',
  styleUrls: ['./construction-call-to-action.component.css']
})
export class ConstructionCallToActionComponent implements OnInit {
  modals: Modals = new Modals();

  constructor(
    public urlService: UrlService,
    private queryParam: QueryParamService)
  {
    this.modals.addModal('b2b-form');
    if (this.queryParam.check('demo')) this.modals.open('b2b-form');
  }

  ngOnInit(): void {
  }

}
