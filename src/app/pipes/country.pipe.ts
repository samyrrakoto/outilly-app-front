import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(isocode: string): string {
    switch(isocode) {
      case 'FR':
        return 'France';
      case 'BE':
        return 'Belgique';
      case 'CH':
        return 'Suisse';
      case 'LU':
        return 'Luxembourg';
    }
  }

}
