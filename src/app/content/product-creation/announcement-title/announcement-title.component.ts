import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-announcement-title',
  templateUrl: './announcement-title.component.html',
  styleUrls: ['../product-creation.component.css', './announcement-title.component.css']
})
export class AnnouncementTitleComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("title") title: ElementRef;

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "announcementTitle";
    this.stepNb = 2;
    this.stepName = "Donnez un titre à votre annonce";
    this.formData.path.previous = "batch-choice";
    this.formData.path.next = "media-upload";
    this.placeholder = "(ex :  Tondeuse à gazon Milwaukee 750-ZF)";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.title.nativeElement.focus();
  }

}
