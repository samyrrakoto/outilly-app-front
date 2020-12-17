import { Modals } from 'src/app/models/modals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  modals: Modals = new Modals();

  constructor() {
    this.modals.addModal('id');
  }

  ngOnInit(): void {
  }

}
