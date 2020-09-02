import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-zipcode',
  templateUrl: './product-zipcode.component.html',
  styleUrls: ['../product-creation.component.css', './product-zipcode.component.css']
})
export class ProductZipcodeComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("zipcode") zipcode: ElementRef;

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "productZipcode";
    this.stepNb = 10;
    this.stepName = "Indiquez votre code postal";
    this.formData.path.previous = "product-description";
    this.formData.path.next = "product-delivery";
    this.placeholder = "(ex :  93500)";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zipcode.nativeElement.focus();
  }
}
