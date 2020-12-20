import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-disclaimer',
  templateUrl: './cookie-disclaimer.component.html',
  styleUrls: ['./cookie-disclaimer.component.css']
})
export class CookieDisclaimerComponent implements OnInit {

  constructor(
    public cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  public readCookies(): void {
    localStorage.setItem('cookies', 'true');
    this.cookieService.set('acceptCookies', 'true');
  }
}
