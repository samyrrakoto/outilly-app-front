import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quality'
})
export class QualityPipe implements PipeTransform {

  transform(quality: string): string {
    switch(quality) {
      case 'forParts':
        return 'Pour pièces';
      case 'acceptable':
        return 'Acceptable';
      case 'good':
        return 'Bon';
      case 'excellent':
        return 'Excellent';
      case 'new':
        return 'Comme neuf'
    }
  }

}
