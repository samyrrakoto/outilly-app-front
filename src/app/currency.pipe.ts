import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullCurrency'
})
export class CurrencyPipe implements PipeTransform {

  transform(price: number) {
    return price / 100;
  }
}
