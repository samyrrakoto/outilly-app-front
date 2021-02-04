import { Faq } from 'src/app/models/faq';
import { HttpStatus } from './request.service';
import { ErrorMessageManagerService } from './error-message-manager.service';
import { ProductRequestService } from 'src/app/services/product-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {
  questionSent: boolean = false;
  answerSent: boolean = false;
  genericQuestions: Faq[] = [];

  constructor(
    private productRequest: ProductRequestService,
    public errorMessages: ErrorMessageManagerService
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
        next: (res: any) => {
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
}
