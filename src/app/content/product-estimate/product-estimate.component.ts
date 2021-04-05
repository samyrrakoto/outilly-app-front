import { CONTACT } from 'src/app/marketing';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-estimate',
  templateUrl: './product-estimate.component.html',
  styleUrls: ['./product-estimate.component.css']
})
export class ProductEstimateComponent implements OnInit {
  readonly contactPhone: string = CONTACT.CHRIS;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }
}
