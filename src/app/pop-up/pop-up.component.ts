import { PopUpService } from 'src/app/services/pop-up.service';
import { Component, Input, OnInit } from '@angular/core';
import { Modals } from '../models/modals';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() popUp: any;
  modals: Modals = new Modals();
  success: boolean = null;

  constructor(
    private popUpManager: PopUpService)
  {
    this.modals.addModal('b2b-form');
  }

  ngOnInit(): void {}

  public hideNotification(): void {
    this.popUpManager.typeform = true;
    localStorage.setItem('typeform', 'true');
  }
}
