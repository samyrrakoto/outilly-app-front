import { UrlService } from 'src/app/services/url.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductManagerService } from 'src/app/services/product-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { questions } from 'src/app/parameters';
import { Modals } from 'src/app/models/modals';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-question-to-vendor',
  templateUrl: './questiontovendor.component.html',
  styleUrls: ['./questiontovendor.component.css']
})
export class QuestiontovendorComponent implements OnInit {
  id: number;
  @Input() productId: number;
  modals: Modals = new Modals();
  userQuestion: string = '';
  form: FormGroup;
  readonly maxQuestionLength: number = questions.MAX_QUESTION_LENGTH;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    public productManager: ProductManagerService,
    public auth: AuthService,
    public url: UrlService)
  {
    this.modals.addModal('ask-question');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.getForm();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      userQuestion: [this.userQuestion, [Validators.required, Validators.maxLength(this.maxQuestionLength)]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
