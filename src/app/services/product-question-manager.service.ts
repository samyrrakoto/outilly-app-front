import { questions } from 'src/app/parameters';
import { Faq } from 'src/app/models/faq';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductQuestionManagerService {

  constructor() { }

  public setQuestionFilter(filter: string): QuestionFilter {
    switch (filter) {
      case 'ALL':
        return QuestionFilter.ALL;
      case 'WAITING':
        return QuestionFilter.WAITING;
      case 'ALREADY_ANSWERED':
        return QuestionFilter.ALREADY_ANSWERED;
    }
  }

  private filterQuestions(questions: Faq[], filter: QuestionFilter): Faq[] {
    const filteredQuestions: Faq[] = [];

    for (const question of questions) {
      if (filter === QuestionFilter.ALREADY_ANSWERED && question.answer) {
        filteredQuestions.push(question);
      }
      else if (filter === QuestionFilter.WAITING && !question.answer) {
        filteredQuestions.push(question);
      }
    }
    return filteredQuestions;
  }

  public getFilteredQuestions(questions: Faq[], filter: QuestionFilter = QuestionFilter.ALL, sort: boolean = true): Faq[] {
    let filteredQuestions: Faq[] = [];

    filteredQuestions = filter === QuestionFilter.ALL ? questions : this.filterQuestions(questions, filter);
    return sort ? this.sortQuestions(filteredQuestions) : filteredQuestions;
  }

  private sortQuestions(questions: Faq[]): Faq[] {
    return questions.sort((a, b) => {
      if (!a.answer && b.answer) {
        return -1;
      }
      else {
        return 1;
      }
    });
  }
}

export enum QuestionFilter {
  ALL,
  ALREADY_ANSWERED,
  WAITING
}
