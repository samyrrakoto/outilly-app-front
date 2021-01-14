import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-back',
  templateUrl: './get-back.component.html',
  styleUrls: ['./get-back.component.css']
})
export class GetBackComponent {
  success: boolean = null;
  email: string = '';
  emailExists: boolean = null;

  constructor(
    private request: RequestService
  )
  { }

  private checkEmailExists(): Promise<boolean> {
    const payload: any = {
      "entity": "user",
      "field": "username",
      "value": this.email
    };

    return new Promise((resolve) => {
      this.request.postData(payload, this.request.uri.CHECK_EXIST).subscribe({
        next: (res: any) => {
          this.emailExists = res.body.exists;
          resolve(res.body.exists);
        }
      })
    })
  }

  public requestPassword(): void {
    const payload: any = {
      "email": this.email
    };

    this.checkEmailExists()
      .then((mailExists: boolean) => {
        if (mailExists) {
          this.request.postData(payload, this.request.uri.PWD_REQUEST).subscribe({
            next: (res: any) => {
              this.success = res.body.result;
            },
            error: () => {
              this.success = false;
            }
          });
        }
      });
  }
}
