import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  testAddition: string = '';
  testResult: string = '';

  constructor() { }

  public generateRandomAddition(minNb: number = 1, maxNb: number = 5): void {
    const a: number = this.randomNumber(minNb, maxNb);
    const b: number = this.randomNumber(minNb, maxNb);

    this.testAddition = a.toString() + ' + ' + b.toString();
    this.testResult = (a + b).toString();
  }

  private randomNumber(minNb: number = 1, maxNb: number = 5): number {
    return Math.round(Math.random() * (maxNb - 1) + minNb);
  }

  public validTest(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        return control.value === this.testResult ? null : {notValid: control.value};
      }
  }
}
