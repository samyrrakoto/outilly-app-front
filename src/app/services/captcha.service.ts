import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  testAddition: string = '';
  testResult: string = '';

  constructor() { }

  public generateRandomAddition(): void {
    const a: number = Math.round(Math.random() * 4 + 1);
    const b: number = Math.round(Math.random() * 4 + 1);

    this.testAddition = a.toString() + ' + ' + b.toString();
    this.testResult = (a + b).toString();
  }

  public validTest(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        return control.value === this.testResult ? null : {notValid: control.value};
      }
  }
}
