import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(price: number, type: string = 'full') {
    switch(type) {
      case 'full':
        return price / 100;
      default:
        return price;
    }
  }
}
