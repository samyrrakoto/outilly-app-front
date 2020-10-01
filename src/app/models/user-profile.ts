import { Address } from './address';
import { Company } from './company';

export class UserProfile {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  emailOptin: boolean;
  phone1: string;
  phone1Optin: boolean;
  phone2: string;
  gender: string;
  birthdate: number;
  type: string;
  company: Company;
  addresses: Array<Address>;

  constructor() {
    this.id = 0;
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.emailOptin = false;
    this.phone1 = '';
    this.phone1Optin = false;
    this.phone2;
    this.gender = '';
    this.birthdate = 0;
    this.type= '';
    this.company = new Company();
    this.addresses = [];
  }
}
