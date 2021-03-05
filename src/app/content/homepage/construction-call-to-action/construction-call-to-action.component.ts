import { staticLinks } from 'src/app/parameters';
import { UrlService } from 'src/app/services/url.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modals } from 'src/app/models/modals';
import { QueryParamService } from 'src/app/services/query-param.service';

@Component({
  selector: 'app-construction-call-to-action',
  templateUrl: './construction-call-to-action.component.html',
  styleUrls: ['./construction-call-to-action.component.css']
})
export class ConstructionCallToActionComponent implements OnInit {
  modals: Modals = new Modals();
  readonly landingPage: string = staticLinks.LANDING_PAGE;
  @ViewChild('landingPage') landingPageButton: ElementRef;

  constructor(
    public urlService: UrlService,
    private queryParam: QueryParamService)
  {
    this.modals.addModal('b2b-form');
    if (this.queryParam.check('demo')) this.modals.open('b2b-form');
  }

  ngOnInit(): void {}

  public getBackToLandingPage(): void {
    if (this.queryParam.check('demo')) {
      this.landingPageButton.nativeElement.href = this.landingPage;
      this.landingPageButton.nativeElement.click();
    }
  }
}
