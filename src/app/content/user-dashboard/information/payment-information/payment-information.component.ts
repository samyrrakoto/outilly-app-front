import { UserManagerService } from 'src/app/services/user-manager.service';
import { Modals } from 'src/app/models/modals';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.css']
})
export class PaymentInformationComponent implements OnInit {
  modals: Modals;
  url: string;

  constructor(
    protected request: RequestService,
    public userManager: UserManagerService,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    public title: Title)
  {
    this.modals = new Modals();
    this.modals.addModal('card');
    this.url = '';
  }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      this.url = url[0].path;

      if (this.url === 'payment-information') {
      }
    });
  }
}
