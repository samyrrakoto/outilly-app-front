import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  form: FormGroup;
  readonly maxMessageLength: number = 255;
  readonly subjects: string[] = [
    'SAV',
    'Marketing',
    'Demande de partenariat'
  ];
  chosenSubject: string = 'SAV';
  message: string = '';
  testAddition: string = '';
  testInput: string = '';
  testResult: string = '';

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getForm();
    this.generateRandomAddition();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      message: [this.message, [Validators.required, Validators.maxLength(this.maxMessageLength)]],
      test: [this.testInput, [this.validTest()]]
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private validTest(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        return control.value === this.testResult ? null : {notValid: control.value};
      }
  }

  public generateRandomAddition(): void {
    const a: number = Math.round(Math.random() * 4 + 1);
    const b: number = Math.round(Math.random() * 4 + 1);

    this.testAddition = a.toString() + ' + ' + b.toString();
    this.testResult = (a + b).toString();
  }

  public sendMessage(): void {
    console.log(this.message);
  }
}
