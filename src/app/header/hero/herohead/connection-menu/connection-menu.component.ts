import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection-menu',
  templateUrl: './connection-menu.component.html',
  styleUrls: ['./connection-menu.component.css']
})
export class ConnectionMenuComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
