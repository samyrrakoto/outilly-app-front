import { Country } from './country';

export class Address {
  id: number;
  name: string;
  type: string;
  line1: string;
  line2: string;
  line3: string;
  zipcode: string;
  city: string;
  country: Country;

  constructor(id: number = 0) {
    this.id = id;
    this.type ='billing';
    this.name = '';
    this.line1 = '';
    this.line2 = '';
    this.line3 = '';
    this.zipcode = '';
    this.city = '';
    this.country = new Country();
  }
}
