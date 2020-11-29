import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-reserve-price',
  templateUrl: './reserve-price.component.html',
  styleUrls: ['../product-creation.component.css', './reserve-price.component.css']
})
export class ReservePriceComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("reservePrice") reservePrice: ElementRef;

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "reservePrice";
    this.stepNb = 18;
    this.stepName = "Quel est votre prix (en €) ?";
    this.formData.path.previous = "announce-kind";
    this.formData.path.next = "announce-overview";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.reservePrice.nativeElement.focus();
  }
}
