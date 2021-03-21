import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  @Input() toDisplay: boolean;
  @Input() toDisplayMenu: boolean;
  @Input() logged: boolean;

  constructor(
    private location: Location,
    private menu: MenuService)
  {
    this.location.onUrlChange((val) => {
      this.menu.showMenu();
    });
  }
}
