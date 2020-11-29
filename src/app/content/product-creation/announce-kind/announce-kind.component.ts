import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announce-kind',
  templateUrl: './announce-kind.component.html',
  styleUrls: ['../product-creation.component.css', './announce-kind.component.css']
})
export class AnnounceKindComponent extends ProductCreationComponent implements OnInit {

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "announceKind";
    this.stepNb = 17;
    this.stepName = "Comment souhaitez-vous vendre votre produit ?";
    this.formData.path.previous = "video-upload";
    this.formData.path.next = "reserve-price";
    this.placeholder = "(ex : jeanmarc78@aol.fr )";
  }

  public setFocus(id: string): void {
    const tiles = ['classic', 'hybrid'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.product.buyingOption);
    if (this.product.buyingOption !== null) {
      document.getElementById(this.product.buyingOption).classList.add('chosen-tile');
    }
  }
}
