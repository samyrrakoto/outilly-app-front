import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-weight',
  templateUrl: './product-weight.component.html',
  styleUrls: ['../product-creation.component.css', './product-weight.component.css']
})
export class ProductWeightComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("weight") weight: ElementRef;
  @ViewChild("unity") unity: ElementRef;
  maxValue: string = '30';

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productWeight";
    this.stepNb = 12;
    this.stepName = "Combien pèse votre colis emballé (en kg) ?";
    this.formData.path.previous = "product-delivery";
    this.formData.path.current = 'product-weight';
    this.formData.path.next = "delivery-price-information";
    this.placeholder = '(ex : 10kg)';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.weight.nativeElement.focus();
  }

  weightChange(): void {
    this.maxValue = this.unity.nativeElement.value === 'kg' ? '30' : '999';
  }
}
