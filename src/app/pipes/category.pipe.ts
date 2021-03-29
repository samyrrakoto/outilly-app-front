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
      case 'alias':
        return this.getAlias(value);
      default:
        return this.getLabel(value);
    }
  }

  private getLabel(value: number): string {
    switch(value) {
      case 1:
        return "Mécanique Garage";
      case 2:
        return "Bricolage BTP Maison";
      case 3:
        return "Jardin Motoculture";
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
    }
  }

  private getDescription(value: number): string {
    switch(value) {
      case 1:
        return "Tout l'équipement pour entretenir et réparer vos véhicules : voitures, moto, scooter, quad, vélo, etc.";
      case 2:
        return "Tout l'équipement et les matériaux pour entretenir, réparer et rénover votre maison : électricité, plomberie, peinture, maçonnerie, etc.";
      case 3:
        return "Tout l'équipement pour créer et entretenir votre jardin : outillage, terrasse, engrais, etc.";
    }
  }

  private getAlias(value: number): string {
    switch(value) {
      case 1:
        return "Pour mon véhicule";
      case 2:
        return "Pour ma maison";
      case 3:
        return "Pour mon jardin";
    }
  }
}
