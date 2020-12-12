import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: number, option: string = ''): string {
    switch(option) {
      case 'icon':
        return this.getIcon(value);
      case 'description':
        return this.getDescription(value);
      default:
        return this.getLabel(value);
    }
  }

  private getLabel(value: number): string {
    switch(value) {
      case 1:
        return "Mécanique";
      case 2:
        return "Bricolage";
      case 3:
        return "Jardin";
      case 4:
        return "Machines d'atelier";
    }
  }

  private getIcon(value: number): string {
    switch(value) {
      case 1:
        return "wrench";
      case 2:
        return "hammer";
      case 3:
        return "seedling";
      case 4:
        return "warehouse";
    }
  }

  private getDescription(value: number): string {
    switch(value) {
      case 1:
        return "Description de la catégorie Mécanique";
      case 2:
        return "Description de la catégorie Bricolage";
      case 3:
        return "Description de la catégorie Jardin";
      case 4:
        return "Description de la catégorie Machines d'atelier";
    }
  }
}
