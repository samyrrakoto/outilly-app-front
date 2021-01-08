import { EncodingService } from 'src/app/services/encoding.service';
import { RequestService } from 'src/app/services/request.service';
import { Modals } from 'src/app/models/modals';
import { ActivatedRoute } from '@angular/router';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { specialCharacters } from 'src/app/parameters';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  loading: boolean = false;
  success: boolean = null;
  form: FormGroup;
  object: any;
  email: string = '';
  pwd: string = '';
  pwdConfirmation: string = '';
  modals: Modals = new Modals();
  readonly specialCharacters: string = specialCharacters;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private request: RequestService,
    private encoding: EncodingService)
  {
    this.modals.addModal('pwd');
  }

  ngOnInit(): void {
    this.getForm();
    this.getParams();
  }

  private getParams(): void {
    this.route.params.subscribe((params) => {
      this.object = JSON.parse(this.encoding.base64Decoder(params['base64']));
    });
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      password: [this.pwd, [Validators.required, this.validFormat()]],
      passwordConfirmation: [this.pwdConfirmation, [Validators.required, this.pwdMatch()]]
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private pwdMatch(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
    {
      return control.value === this.pwd ? null : {match: control.value};
    }
  }

  private validFormat(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const longEnough: boolean = control.value.length >= 7;
        const containsUpper: boolean = this.containsUpper(control.value);
        const containsLower: boolean = this.containsLower(control.value);
        const containsDigit: boolean = this.containsDigit(control.value);
        const containsSpecialCharacter: boolean = this.containsSpecial(control.value);

        const verifications: boolean = longEnough && containsUpper && containsLower && containsDigit && containsSpecialCharacter;
        return verifications ? null : {notCorrect: control.value};
      }
  }

  private containsUpper(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "A".charCodeAt(0) && c.charCodeAt(0) <= "Z".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  private containsLower(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "a".charCodeAt(0) && c.charCodeAt(0) <= "z".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  private containsDigit(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "0".charCodeAt(0) && c.charCodeAt(0) <= "9".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  private containsSpecial(str: string): boolean {
    for (const c of str) {
      for (const specialChar of specialCharacters) {
        if (c === specialChar) {
          return true;
        }
      }
    }
    return false;
  }

  public submitNewPassword(): void {
    this.loading = true;
    const payload: any = {
      "email": this.object.email,
      "token": this.object.token,
      "newPwd": this.pwd
    };

    this.request.putData(this.request.uri.NEW_PWD, payload).subscribe({
      next: (res: any) => {
        this.success = res.result;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.success = false;
      }
    })
  }
}
