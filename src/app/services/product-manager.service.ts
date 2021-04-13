import { Faq } from 'src/app/models/faq';
import { HttpStatus } from 'src/app/services/request.service';
import { ErrorMessageManagerService } from 'src/app/services/error-message-manager.service';
import { ProductRequestService } from 'src/app/services/product-request.service';
import { Injectable } from '@angular/core';
import { storage } from 'src/app/parameters';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {
  questionSent: boolean = false;
  answerSent: boolean = false;
  genericQuestions: Faq[] = [];

  constructor(
    private productRequest: ProductRequestService,
    public errorMessages: ErrorMessageManagerService,
  ) { }

  public askQuestion(productId: number, question: string): void {
    this.productRequest.askQuestion(productId, question).subscribe({
      next: (res: any) => {
        if (res.status === HttpStatus.CREATED) {
          this.errorMessages.removeErrorMessage(this.errorMessages.errorMessageTemplate.SIMPLE);
          this.questionSent = true;
        }
        else {
          this.errorMessages.addErrorMessage(this.errorMessages.errorMessageTemplate.SIMPLE);
        }
      },
      error: () => {
        this.errorMessages.addErrorMessage(this.errorMessages.errorMessageTemplate.SIMPLE);
      }
    });
  }

  public getGenericQuestions(): Promise<Faq[]> {
    return new Promise((resolve) => {
      this.productRequest.getGenericQuestions().subscribe({
        next: (faq: any) => {
          resolve(faq.faqItems);
        }
      });
    });
  }

  public getAnsweredQuestions(questions: Faq[]): Faq[] {
    const answeredQuestions: Faq[] = [];

    for (const question of questions) {
      if (question.answer) {
        answeredQuestions.push(question);
      }
    }
    return answeredQuestions;
  }

  public answerQuestion(questionId: number, answer: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.productRequest.answerQuestion(questionId, answer).subscribe({
        next: () => {
          this.answerSent = true;
          resolve();
        },
        error: () => {
          this.errorMessages.addErrorMessage(this.errorMessages.errorMessageTemplate.SIMPLE);
          reject();
        }
      });
    });
  }

  public async createProduct(): Promise<void> {
    this.productRequest.createProduct().subscribe(
      (res: any) => {
        localStorage.setItem(storage.PRODUCT_ID, res.body.id);
        localStorage.setItem(storage.PRODUCT_STR_ID, res.body.strId);
    });
  }

  public async createProductEstimation(): Promise<void> {
    this.productRequest.createProduct().subscribe(
      (res: any) => {
        localStorage.setItem(storage.ESTIMATION_ID, res.body.id);
        localStorage.setItem(storage.ESTIMATION_STR_ID, res.body.strId);
    });
  }

  public removeProduct(): void {
    localStorage.removeItem(storage.PRODUCT_ID);
    localStorage.removeItem(storage.PRODUCT_STR_ID);
  }

  public removeProductEstimation(): void {
    localStorage.removeItem(storage.ESTIMATION_ID);
    localStorage.removeItem(storage.ESTIMATION_STR_ID);
  }

  public isProductStored(): boolean {
    return localStorage.getItem(storage.PRODUCT_ID) !== null;
  }

  public isEstimationStored(): boolean {
    return localStorage.getItem(storage.ESTIMATION_ID) !== null;
  }
}
