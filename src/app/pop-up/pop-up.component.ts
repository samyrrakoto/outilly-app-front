import { PopUpService } from 'src/app/services/pop-up.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() popUp: any;

  constructor(
    private popUpManager: PopUpService
  ) { }

  ngOnInit(): void {
  }

  public hideNotification(): void {
    this.popUpManager.typeform = true;
    localStorage.setItem('typeform', 'true');
  }
}
