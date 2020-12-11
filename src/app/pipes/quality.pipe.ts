import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quality'
})
export class QualityPipe implements PipeTransform {

  transform(quality: string, param?: string): string {
    switch (param) {
      case 'description':
        return this.getQualityDescription(quality);
      default:
        return this.getQuality(quality);
    }
  }

  private getQuality(quality: string): string {
    switch(quality) {
      case 'forparts':
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

  private getQualityDescription(quality: string) {
    switch(quality) {
      case 'forparts':
        return 'Produit non fonctionnel vendu pour pièces';
      case 'acceptable':
        return 'Produit présentant de l\'usure et/ou des défauts mais encore utilisable';
      case 'good':
        return 'Produit bien utilisé mais qui a encore de l\'avenir';
      case 'excellent':
        return 'Produit utilisé mais conservant toutes ses qualités premières';
      case 'new':
        return 'Produit quasiment jamais utilisé, voire neuf'
    }
  }
}
