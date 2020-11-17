import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'announce'
})
export class AnnouncePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'classic':
        return 'Annonce classique';
      case 'hybrid':
        return 'Annonce hybride';
    }
  }
}
