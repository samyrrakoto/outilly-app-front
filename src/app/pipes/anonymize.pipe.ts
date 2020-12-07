import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anonymize'
})
export class AnonymizePipe implements PipeTransform {

  transform(str: string, min: number = 1): string {
    let result: string = '';
    let i: number = 0;

    for (const char of str) {
      result += i < min ? char : '*';
      i++;
    }
    return result;
  }
}
