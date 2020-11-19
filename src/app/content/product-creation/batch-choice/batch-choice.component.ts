import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-batch-choice',
  templateUrl: './batch-choice.component.html',
  styleUrls: ['../product-creation.component.css', './batch-choice.component.css']
})
export class BatchChoiceComponent extends ProductCreationComponent implements OnInit {
  private isLogged: boolean;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    private auth: AuthService)
    {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "batchChoice";
    this.stepNb = 1;
    this.stepName = "Vendez-vous un lot de plusieurs pièces ?";
    this.formData.path.previous = "batch-choice";
    this.formData.path.next = "announcement-title";
    this.placeholder = "(ex : jeanmarc78@aol.fr )";
    this.product.isBundle = null;
  }

  ngOnInit(): void {
    if (localStorage.getItem('id') === null || localStorage.getItem('strId') === null) {
      this.createProduct();
    }
    this.auth.getLogStatus()
      .then(() => {
        this.isLogged = this.auth.logged && this.auth.accessToken === 'good';
        if (this.isLogged) {
          this.getUser();
        }
      });
}

  ngOnDestroy(): void {
    this.formData.product.id = +localStorage.getItem(('id'));
    this.formData.product.strId = localStorage.getItem('strId');
  }

  private createProduct(): void {
    const response = this.request.postData('', this.request.uri.PRODUCT_CREATION);

    response.subscribe((res) => {
        localStorage.setItem('id', res.body.id);
        localStorage.setItem('strId', res.body.strId);
    });
  }

  private getUser(): void {
    const response = this.request.getData(this.request.uri.GET_USER);

    response.subscribe((res) => {
      this.formData.product.locality = res.userProfile.addresses[0].zipcode;
    });
  }

  public setFocus(id: string): void {
    const tiles = ['bundled', 'not-bundled'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
