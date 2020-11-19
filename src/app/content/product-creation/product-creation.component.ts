import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Path } from 'src/app/models/Path/path';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {
  product: Product;
  nbStep: number = 19;
  stepNb: number;
  stepName: string;
  placeholder: string;
  path: Path;
  isMandatory: boolean;
  errorMessages: Array<string>;
  nextOn: boolean;
  previousOn: boolean;
  readonly rootUri = 'product/create/';

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidator: FormValidatorService)
  {
    this.product = new Product();
    this.stepNb = 0;
    this.stepName = '';
    this.placeholder = 'Ecrivez ici';
    this.path = new Path();
    this.isMandatory = true;
    this.errorMessages = [];
  }

  ngOnInit(): void {
    this.previousOn = false;
    this.nextOn = false;
  }

  // Keyboard shortcuts
  onKey(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === 'ArrowLeft') {
      this.previousOn = !this.previousOn;
    }
    else if ((event.shiftKey && event.key === 'ArrowRight') || (event.key === 'Enter')) {
      this.nextOn = !this.nextOn;
    }
  }
}
