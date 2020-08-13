import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-batch-choice',
  templateUrl: './batch-choice.component.html',
  styleUrls: ['../product-creation.component.css', './batch-choice.component.css']
})
export class BatchChoiceComponent extends ProductCreationComponent {

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "batchChoice";
    this.stepNb = 1;
    this.stepName = "Vendez-vous un lot de plusieurs pièces ?";
    this.formData.path.previous = "batch-choice";
    this.formData.path.next = "announcement-title";
    this.placeholder = "(ex : jeanmarc78@aol.fr )";
  }

  setFocus(id: string): void {
    const tiles = ['bundled', 'not-bundled'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
