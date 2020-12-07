import { UserProfile } from './../../../models/user-profile';
import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-zipcode',
  templateUrl: './product-zipcode.component.html',
  styleUrls: ['../product-creation.component.css', './product-zipcode.component.css']
})
export class ProductZipcodeComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("zipcode") zipcode: ElementRef;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(request, formData, router, formValidatorService, title);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productZipcode";
    this.stepNb = 10;
    this.stepName = "Indiquez votre code postal";
    this.formData.path.current = "product-zipcode";
    this.formData.path.previous = "product-description";
    this.formData.path.next = "product-delivery";
    this.placeholder = "(ex :  93500)";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zipcode.nativeElement.focus();
  }
}
