import { accountOnboarding } from 'src/app/onboardings';
import { Path } from './Path/path';
import { GenericComponent } from './generic-component';

export class StepForm extends GenericComponent {
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
  wording: any = {};

  constructor(onboarding: string[] = [], stepName?: string) {
    super();
    this.totalNbSteps = this.getTotalNbSteps(onboarding);
    this.stepNb = this.getStepNb(onboarding, stepName);
    this.path = this.getPath(onboarding, stepName);
  }

  // Keyboard shortcuts
  public onKey(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === 'ArrowLeft') {
      this.previousOn = !this.previousOn;
    }
    else if ((event.shiftKey && event.key === 'ArrowRight') || (event.key === 'Enter')) {
      this.nextOn = !this.nextOn;
    }
  }

  private getStepNb(onboarding: any, stepName: string): number {
    let i: number = 1;

    for (const step of onboarding) {
      if (stepName === step) {
        return i;
      }
      i++;
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

  public findSubStepsNb(stepName: string): number {
    let nbSubSteps: number = 0;

    for (const step of accountOnboarding) {
      if (step.includes('/')) {
        nbSubSteps++;
      }
      if (step === stepName) {
        return nbSubSteps;
      }
    }
  }

  private getPath(onboarding: any, stepName: string): Path {
    const path: Path = new Path();
    path.current = stepName;

    for (let i: number = 0; i < onboarding.length; i++) {
      if (onboarding[i] === stepName) {
        if (i > 0) {
          path.previous = onboarding[i - 1];
        }
        if (i < onboarding.length - 1) {
          path.next = onboarding[i + 1];
        }
      }
    }
    return path;
  }

  private getTotalNbSteps(onboarding: string[]): number {
    let nbSteps: number = 0;

    for (const step of onboarding) {
      if (!step.includes('/')) {
        nbSteps++;
      }
    }
    return nbSteps;
  }
}
