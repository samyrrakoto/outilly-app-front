import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-announcement-title',
  templateUrl: './announcement-title.component.html',
  styleUrls: ['../product-creation.component.css', './announcement-title.component.css']
})
export class AnnouncementTitleComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("fieldTitle") fieldTitle: ElementRef;
  isLogged: boolean;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    private auth: AuthService,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(request, formData, router, formValidatorService, title);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "announcementTitle";
    this.stepNb = 1;
    this.stepName = "Donnez un titre à votre annonce";
    this.formData.path.current = "announcement-title";
    this.formData.path.previous = "";
    this.formData.path.next = "media-upload";
    this.placeholder = "(ex :  Tondeuse à gazon Milwaukee 750-ZF)";
    this.isLogged = false;
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

  ngAfterViewInit(): void {
    this.fieldTitle.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.formData.product.id = +localStorage.getItem(('id'));
    this.formData.product.strId = localStorage.getItem('strId');
  }

  private createProduct(): void {
    this.request.postData('', this.request.uri.PRODUCT_CREATION).subscribe(
      (res) => {
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
}
