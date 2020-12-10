import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['../product-creation.component.css', './product-description.component.css']
})
export class ProductDescriptionComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  product: Product;
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
    super();
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productDescription";
    this.stepNb = 9;
    this.stepName = "Description de votre annonce";
    this.stepSubtitle = "Expliquez avec le plus de détails possibles ce que vous vendez. N'oubliez pas que l'acheteur compte sur ces détails pour motiver son achat !";
    this.path.current = "product-description";
    this.path.previous = "product-state";
    this.path.next = "product-zipcode";
    this.placeholder = "Tondeuse en parfait état de marche...";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.description.nativeElement.focus();
  }

  public removeAllSpaces(str: string): string {
    str = str.trim();

    while (str.indexOf(' ') !== -1) {
      str = str.replace(' ', '');
    }
    return str;
  }
}
