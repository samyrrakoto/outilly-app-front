import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormCreatorService {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public get controls() {
    return this.form.controls;
  }

  public getForm(verifications: any): void {
    this.form = this.formBuilder.group(verifications);
  }
}
