import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight'
})
export class WeightPipe implements PipeTransform {

  transform(weight: number, type: string): string {
    switch(type) {
      case 'unity':
        return weight < 1000 ? 'g' : 'kg';
      case 'value':
        return weight < 1000 ? weight.toString() : (weight / 1000).toString();
    }
  }

}
