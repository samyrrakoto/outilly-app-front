import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Atelier':
        return "Machines d'atelier";
      default:
        return value;
    }

    return null;
  }

}
