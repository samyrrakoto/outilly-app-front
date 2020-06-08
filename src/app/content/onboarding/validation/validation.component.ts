import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service'

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor(public formDataService : FormDataService)
  {
  }

  ngOnInit(): void {
  }

  submit() : void {
    let data = JSON.stringify(this.formDataService);
    console.log(data);
  }
}
