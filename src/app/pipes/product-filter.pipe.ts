import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(filterType: string): string {
    switch (filterType) {
      case 'category':
        return 'Catégorie';
      case 'type':
        return 'Type';
      case 'decreasingPrice':
        return 'Prix décroissant';
      case 'reference':
        return 'Référence';
    };
  }

}
