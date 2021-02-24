import { EncodingService } from 'src/app/services/encoding.service';
import { RequestService } from 'src/app/services/request.service';
import { Modals } from 'src/app/models/modals';
import { ActivatedRoute } from '@angular/router';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StringToolboxService } from 'src/app/services/string-toolbox.service';
import { pwd } from 'src/app/parameters';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  readonly specialCharacters: string = pwd.SPECIAL_CHARACTERS;
  readonly minPwdLength: number = pwd.MIN_PWD_LENGTH;
  loading: boolean = false;
  success: boolean = null;
  form: FormGroup;
  object: any;
  email: string = '';
  pwd: string = '';
  pwdConfirmation: string = '';
  modals: Modals = new Modals();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private request: RequestService,
    private encoding: EncodingService,
    private strToolbox: StringToolboxService)
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
        const longEnough: boolean = control.value.length >= this.minPwdLength;
        const containsUpper: boolean = this.strToolbox.containsUpper(control.value);
        const containsLower: boolean = this.strToolbox.containsLower(control.value);
        const containsDigit: boolean = this.strToolbox.containsDigit(control.value);
        const containsSpecialCharacter: boolean = this.strToolbox.containsSpecial(control.value);

        const verifications: boolean = longEnough && containsUpper && containsLower && containsDigit && containsSpecialCharacter;
        return verifications ? null : {notCorrect: control.value};
      }
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
