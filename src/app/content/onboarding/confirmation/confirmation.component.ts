import { pageInfo } from 'src/app/parameters';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  readonly brandName: string = pageInfo.BRAND_NAME;

  constructor(
    private formData: FormDataService,
    public router: Router,
    private auth: AuthService)
  {
    localStorage.removeItem('formData');
    this.formData.user = new User();
    this.formData.isAccountComplete = false;
  }

  ngOnInit(): void {
  }

  public backToLogin(): void {
    this.auth.logout();
  }

}
