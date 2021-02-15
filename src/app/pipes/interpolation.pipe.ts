import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interpolation'
})
export class InterpolationPipe implements PipeTransform {

  transform(str: string, object: object) {
    const interpolations: string[] = this.findInterpolations(str);

    for (const interpolation of interpolations) {
      const attribute: string = this.getAttributeName(interpolation);

      str = str.replace(interpolation, object[attribute]);
    }
    return str;
  }

  private findInterpolations(str: string): string[] {
    const regex: RegExp = new RegExp(/\{\{[a-zA-Z. ]+\}\}/g);

    return str.match(regex) ? str.match(regex) : [];
  }

  private getAttributeName(interpolation: string): string {
    let attribute: string = interpolation.replace('{{', '');
    attribute = attribute.replace('}}', '');

    return attribute.trim();
  }
}
