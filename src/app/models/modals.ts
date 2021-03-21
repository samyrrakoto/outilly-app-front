import { MenuService } from 'src/app/services/menu.service';

export class Modals {
  menu: MenuService = new MenuService;

  constructor(
  ) {}

  public addModal(modal: string, initialValue: string = ''): void {
    Object.defineProperty(this, modal, {
      value: initialValue,
      writable: true
    });
  }

  public get(modal: string) {
    return this[modal];
  }

  public open(modalName: string): void {
    this[modalName] = 'is-active';
    this.menu.hideMenu();
  }

  public close(modalName: string): void {
    this[modalName] = '';
    this.menu.showMenu();
  }
}
