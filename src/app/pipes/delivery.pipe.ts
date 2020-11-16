import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delivery'
})
export class DeliveryPipe implements PipeTransform {

  transform(deliveryMethod: string): string {
    switch(deliveryMethod) {
      case 'HandDelivery':
        return 'Remise en mains propres';
      case 'RelayShip':
        return 'Mondial Relay';
    };
  }

}
