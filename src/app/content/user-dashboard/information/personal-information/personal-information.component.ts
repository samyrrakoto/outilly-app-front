import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  constructor(public formDataService: FormDataService) { }

  ngOnInit(): void {
  }

}
