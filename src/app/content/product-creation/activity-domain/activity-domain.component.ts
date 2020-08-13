import { RequestService } from './../../../services/request.service';
import { ActivityDomain } from './../../../models/activity-domain';
import { FormValidatorService } from './../../../services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../services/form-data.service';
import { ProductCreationComponent } from './../product-creation.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-domain',
  templateUrl: './activity-domain.component.html',
  styleUrls: ['../product-creation.component.css', './activity-domain.component.css']
})
export class ActivityDomainComponent extends ProductCreationComponent implements OnInit {

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.product.activityDomains = [new ActivityDomain('mecanique')];
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "activityDomain";
    this.stepNb = 4;
    this.stepName = "Choisissez un domaine d'activité.";
    this.formData.path.previous = "media-upload";
    this.formData.path.next = "product-brand";
  }

  ngOnInit(): void {
  }

  setFocus(id: string): void {
    const tiles = ['mecanique', 'bricolage', 'jardin', 'machine'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }

  setActivityDomain(activity: string) {
    const activityDomain = new ActivityDomain(activity);

    this.product.activityDomains = [];
    this.product.activityDomains.push(activityDomain);
  }
}
