import { Modals } from './../../../../models/modals';
import { AuthService } from './../../../../services/auth.service';
import { RequestService } from './../../../../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationComponent } from './../information.component';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.css']
})
export class PaymentInformationComponent extends InformationComponent implements OnInit {
  modals: Modals;
  url: string;

  constructor(protected request: RequestService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    public title: Title)
  {
    super(request, auth, router, route, title);
    this.modals = new Modals();
    this.modals.addModal('card');
    this.url = '';
  }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      this.url = url[0].path;

      if (this.url === 'payment-information') {
        this.setFocus(this.informationTabs, 'payment-information');
      }
    });
  }
}
