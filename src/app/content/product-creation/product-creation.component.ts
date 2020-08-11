import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Path } from 'src/app/models/Path/path';
import { Product } from './../../models/product';
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
  stepNb: number;
  stepName: string;
  placeholder: string;
  ngModelName: string;
  path: Path;
  isMandatory: boolean;
  errorMessages: Array<string>;
  readonly root = 'product/create/';

  constructor(public formDataService: FormDataService, public router: Router, public formValidator: FormValidatorService)
  {
    this.product = new Product();
    this.stepNb = 0;
    this.stepName = '';
    this.placeholder = 'Ecrivez ici';
    this.ngModelName = '';
    this.path = new Path();
    this.isMandatory = true;
    this.errorMessages = [];
  }

  ngOnInit(): void {}

  next(): void {
    const path = this.root + this.formDataService.path.next;

    // Verifying that the field matches the constraints it gets before going further
    if (this.formValidator.verify(this.formDataService)) {
      this.router.navigateByUrl(path);
    }
  }

  previous(): void {
    const path = this.root + this.formDataService.path.previous;

    this.router.navigateByUrl(path);
  }

  goTo(route: string): void {
    const path = this.root + route;

    this.router.navigateByUrl(path);
  }

  // Keyboard shortcuts
  onKey(event: KeyboardEvent): void {
    if ((event.shiftKey && event.key === 'ArrowRight') || (event.key === 'Enter')) {
      this.next();
    }
    else if (event.shiftKey && event.key === 'ArrowLeft') {
      this.previous();
    }
  }
}
