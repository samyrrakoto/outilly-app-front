import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['../product-creation.component.css', './warranty-duration.component.css']
})
export class WarrantyDurationComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("warranty") warranty: ElementRef;

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
    this.formData.fieldName = "warrantyDuration";
    this.stepNb = 15;
    this.stepName = "Combien de mois garantissez-vous le produit ?";
    this.formData.path.previous = "is-warrantied";
    this.formData.path.next = "video-upload";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.warranty.nativeElement.focus();
  }
}
