import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcement-title',
  templateUrl: './announcement-title.component.html',
  styleUrls: ['../product-creation.component.css', './announcement-title.component.css']
})
export class AnnouncementTitleComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  isLogged: boolean;
  product: Product;
  form: FormGroup;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    private auth: AuthService,
    public formValidatorService: FormValidatorService,
    public title: Title,
    public formBuilder: FormBuilder)
  {
    super(productOnboarding);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "announcementTitle";
    this.stepNb = 1;
    this.stepName = "Que souhaitez-vous vendre ?";
    this.stepSubtitle = "Titre de votre annonce";
    this.path.current = "announcement-title";
    this.path.previous = "";
    this.path.next = "media-upload";
    this.placeholder = "Tondeuse à gazon Milwaukee 750-ZF";
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.getForm();
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

  ngAfterViewInit(): void {
    const announceTitle: HTMLElement = document.getElementById('announceTitle');

    if (announceTitle !== null) {
      announceTitle.focus();
    }
  }

  ngOnDestroy(): void {
    this.formData.product.id = +localStorage.getItem(('id'));
    this.formData.product.strId = localStorage.getItem('strId');
  }

  private createProduct(): void {
    this.request.postData('', this.request.uri.PRODUCT_CREATION).subscribe(
      (res: any) => {
        localStorage.setItem('id', res.body.id);
        localStorage.setItem('strId', res.body.strId);
    });
  }

  private getUser(): void {
    this.request.getData(this.request.uri.GET_USER).subscribe({
      next: (res) => this.formData.product.locality = res.userProfile.addresses[0].zipcode
    });
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      announceTitle: [this.product.name, [Validators.required, this.validDescription()]],
    });
  }

  private validDescription(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const value: string = this.removeUselessSpaces(control.value);
        const longEnough: boolean = this.removeAllSpaces(value).length >= 8;
        const minWordsNb: boolean = this.minWordsNb(value);
        const verifications: boolean = longEnough && minWordsNb;

        return verifications ? null : {notValid: control.value};
      }
  }

  private minWordsNb(value: string): boolean {
    return value.split(' ').length >= 2;
  }

  private removeUselessSpaces(str: string): string {
    str = str.trim();

    return str;
  }

  private removeAllSpaces(str: string): string {
    while (str.indexOf(' ') !== -1) {
      str = str.replace(' ', '');
    }
    return str;
  }

  public get controls() {
    return this.form.controls;
  }
}
