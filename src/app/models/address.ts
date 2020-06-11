import { Country } from './country';

export class Address {
    type: string;
    line1: string;
    zipcode: string;
    city: string;
    country: Country;

    constructor() {
        this.type ="billing";
        this.line1 = "";
        this.zipcode = "";
        this.city = "";
        this.country = new Country();
    }
}
