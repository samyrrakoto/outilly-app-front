import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {

  constructor(
    private request: RequestService
  ) {}

  public askQuestion(productId: number, question: string): Observable<any> {
    const data: any = {
      "productId": productId,
      "question": question
    };

    return this.request.postData(data, this.request.uri.ASK_PRODUCT_QUESTION);
  }

  public answerQuestion(questionId: number, answer: string): Observable<any> {
    const data: any = {
      "questionId": questionId,
      "answer": answer
    };

    return this.request.putData(this.request.uri.ANSWER_PRODUCT_QUESTION, data);
  }

  public getGenericQuestions(): Observable<any> {
    return this.request.getData(this.request.uri.FAQ_PRODUCT);
  }

  public createProduct(): Observable<any> {
    return this.request.postData('', this.request.uri.PRODUCT_CREATION);
  }

  public updateProduct(payload: any): Observable<any> {
    return this.request.putData(this.request.uri.PRODUCT_UPDATE, payload);
  }
}
