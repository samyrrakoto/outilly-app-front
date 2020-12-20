import { Modals } from 'src/app/models/modals';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() click: Subject<any> = new Subject<any>();
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
  modals: Modals = new Modals();

  constructor(
    public formBuilder: FormBuilder
  )
  {
    this.modals.addModal('contact-form');
  }

  ngOnInit(): void {
    this.getForm();
    this.generateRandomAddition();
    this.click.subscribe(
      () => { this.modals.open('contact-form') }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
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
