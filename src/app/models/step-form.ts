import { Path } from './Path/path';

export class StepForm {
  fieldName: string = '';
  stepNb: number = 0;
  errorMessages: string[] = [];
  stepName: string = '';
  placeholder: string = '';
  path: Path = new Path();
  isMandatory: boolean = true;
  nextOn: boolean = false;
  previousOn: boolean = false;
  disabledEnterKey: boolean = false;
  disabledNgCheck: boolean = false;

  // Keyboard shortcuts
  public onKey(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === 'ArrowLeft') {
      this.previousOn = !this.previousOn;
    }
    else if ((event.shiftKey && event.key === 'ArrowRight') || (event.key === 'Enter')) {
      this.nextOn = !this.nextOn;
    }
  }
}
