import { Modals } from 'src/app/models/modals';
import { CookieService } from 'ngx-cookie-service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-disclaimer',
  templateUrl: './cookie-disclaimer.component.html',
  styleUrls: ['./cookie-disclaimer.component.css']
})
export class CookieDisclaimerComponent implements OnInit {
  @Input() cookies: boolean;
  modals: Modals = new Modals();

  constructor(
    public cookieService: CookieService
  )
  {
    this.modals.addModal('privacy-policy');
  }

  ngOnInit(): void {
  }

  public readCookies(): void {
    localStorage.setItem('cookies', 'true');
    this.cookieService.set('cookies', 'true');
  }
}
