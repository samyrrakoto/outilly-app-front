import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeDescription'
})
export class TypeDescriptionPipe implements PipeTransform {

  transform(typeLabel: string): string {
    switch(typeLabel) {
      case 'Electrique / Filaire':
        return 'Fonctionne en se branchant à une prise';
      case 'Electroportatif / À batterie':
        return 'Fonctionne avec une batterie ou une pile';
      case 'Hydraulique':
        return 'Fonctionne avec des fluides (huile) à haute pression';
      case 'Outillage à main':
        return 'Fonctionne avec la force des bras';
      case 'Pneumatique / À air':
        return 'Fonctionne à l\'aide d\'air comprimé';
      case 'Thermique / Moteur à carburant':
        return 'Fonctionne avec moteur à carburant';
    }
  }

}
