import { Address } from './address';

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
        this.address = new Address();
    }
}
