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
  activityDomains: Array<ActivityDomain>;

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
    this.activityDomains = [];
  }

  ngOnInit(): void {
    this.product.activityDomains = [];
    this.getActivityDomains();
  }

  getActivityDomains(): void {
    const response = this.request.getData(this.request.uri.ACTIVITY_DOMAINS);

    response.subscribe((res) => {
      this.activityDomains = res;
    });
  }

  setFocus(id: string): void {
    if (document.getElementById(id).classList.contains('chosen-tile')) {
      document.getElementById(id).classList.remove('chosen-tile');
      this.removeActivityDomain(id);
    }
    else {
      document.getElementById(id).classList.add('chosen-tile');
      this.addActivityDomain(id);
    }
  }

  private addActivityDomain(activity: string): void {
    this.product.activityDomains.push(new ActivityDomain(activity));
    console.log(this.product.activityDomains);
  }

  private removeActivityDomain(activity: string): void {
    let pos = this.findActivity(activity);

    this.product.activityDomains.splice(pos, 1);
    console.log(this.product.activityDomains);
  }

  private findActivity(activity: string): number {
    let i: number = 0;

    for (const elem of this.product.activityDomains) {
      if (elem.name === activity) {
        return i;
      }
      i++;
    }
    return -1;
  }
}
