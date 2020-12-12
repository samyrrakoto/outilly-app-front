import { Address } from './address';
import { Company } from './company';

export class UserProfile {
  id: number;
  firstname: string;
  anonFirstName: string;
  lastname: string;
  anonLastName: string;
  email: string;
  emailOptin: boolean;
  phone1: string;
  phone1Optin: boolean;
  phone2: string;
  gender: string;
  civility: string;
  birthdate: number;
  type: string;
  company: Company;
  addresses: Array<Address>;
  mainAddress: Address;
  nationality: string;
  countryOfResidence: string;

  constructor() {
    this.id = 0;
    this.firstname = '';
    this.anonFirstName = '';
    this.lastname = '';
    this.anonLastName = '';
    this.email = '';
    this.emailOptin = null;
    this.phone1 = '';
    this.phone1Optin = false;
    this.phone2;
    this.gender = null;
    this.civility = 'MR';
    this.birthdate = 0;
    this.type= null;
    this.company = new Company();
    this.addresses = [];
    this.mainAddress = new Address();
    this.nationality = null;
    this.countryOfResidence = null;
  }
}
