import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activitation-account-warning',
  templateUrl: './activitation-account-warning.component.html',
  styleUrls: ['./activitation-account-warning.component.css']
})
export class ActivitationAccountWarningComponent implements OnInit {
  @Input() activated: boolean;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  public closeNotification(notif: HTMLInputElement): void {
    notif.remove();
  }
}
