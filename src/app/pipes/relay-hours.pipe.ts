import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relayHours'
})
export class RelayHoursPipe implements PipeTransform {

  transform(hour: string): string {
    return hour === 'CLOSED' ? 'Fermé' : hour;
  }

}
