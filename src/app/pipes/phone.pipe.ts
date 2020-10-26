import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phoneNumber: string, char: string = '.'): string {
    let formattedPhoneNumber = '';

    for (let i = 0; i < phoneNumber.length; i++) {
      if ([2, 4, 6, 8].includes(i)) {
        formattedPhoneNumber += char;
      }
      formattedPhoneNumber += phoneNumber[i];
    }
    return formattedPhoneNumber;
  }

}
