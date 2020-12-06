import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['../product-creation.component.css', './product-description.component.css']
})
export class ProductDescriptionComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("description") description: ElementRef;
  readonly maxLength: number = 650;
  readonly minLength: number = 20;

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
    this.formData.fieldName = "productDescription";
    this.stepNb = 9;
    this.stepName = "Description de votre annonce";
    this.formData.path.current = "product-description";
    this.formData.path.previous = "product-state";
    this.formData.path.next = "product-zipcode";
    this.placeholder = "(ex :  Tondeuse en parfait état de marche...)";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.description.nativeElement.focus();
  }
}
