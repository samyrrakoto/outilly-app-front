import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private formData: FormDataService, public router: Router) {
    localStorage.removeItem('formData');
  }

  ngOnInit(): void {
  }

  public backToLogin(): void {
    this.router.navigate(['login']);
  }

}
