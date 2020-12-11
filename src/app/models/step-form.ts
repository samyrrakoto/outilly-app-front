import { accountOnboarding } from 'src/app/onboardings';
import { Path } from './Path/path';

export class StepForm {
  fieldName: string = '';
  totalNbSteps: number = 0;
  stepNb: number = 0;
  stepSubtitle: string = '';
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

  public findAccountStepNb(stepName: string): number {
    let i: number = 1;

    for (const step of accountOnboarding) {
      if (stepName === step) {
        return i;
      }
      i++;
    }
  }
}
