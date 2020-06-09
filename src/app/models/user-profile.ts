import { Address } from './address';
import { Company } from './company';

export class UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    emailOptin: boolean;
    phone1: string;
    phone1Optin: boolean;
    gender: string;
    birthdate: Date;
    type: string;
    company: Company;
    address: Address;

    constructor()
    {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.emailOptin = false;
        this.phone1 = "";
        this.phone1Optin = false;
        this.gender = "";
        this.birthdate = null;
        this.type= "";
        this.company = new Company();
        this.address = new Address();
    }
}
