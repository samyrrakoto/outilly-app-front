import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announce-overview',
  templateUrl: './announce-overview.component.html',
  styleUrls: ['../product-creation.component.css', './announce-overview.component.css']
})
export class AnnounceOverviewComponent implements OnInit {

  constructor(public data: FormDataService) {}

  ngOnInit(): void {
    this.data.isComplete = true;
  }

}
