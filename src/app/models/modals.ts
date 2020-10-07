export class Modals {
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
  }

  public close(modalName: string): void {
    this[modalName] = '';
  }
}
