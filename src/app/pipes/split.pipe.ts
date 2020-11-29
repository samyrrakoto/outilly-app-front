import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(str: string, delimiter: string = '-', pos: number = 0): string {
    return str.split(delimiter)[pos];
  }

}
