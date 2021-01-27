export class InputToolbox {
  public passwordDisplay(elem: HTMLInputElement): void {
    elem.type = elem.type === 'password' ? 'text' : 'password';
  }
}
