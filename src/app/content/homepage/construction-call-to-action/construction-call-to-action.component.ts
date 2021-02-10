import { UrlService } from 'src/app/services/url.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-construction-call-to-action',
  templateUrl: './construction-call-to-action.component.html',
  styleUrls: ['./construction-call-to-action.component.css']
})
export class ConstructionCallToActionComponent implements OnInit {

  constructor(
    public urlService: UrlService
  ) {}

  ngOnInit(): void {
  }

}
