import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-onboarding',
  templateUrl: './account-onboarding.component.html',
  styleUrls: ['./account-onboarding.component.css']
})
export class AccountOnboardingComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.isLogged()) {
      this.router.navigate(["/user/dashboard"]);
    }
  }
}
