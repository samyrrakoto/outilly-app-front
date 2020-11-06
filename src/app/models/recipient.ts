export class Recipient {
  public civility: string;
  public firstname: string;
  public lastname: string;
  public addLine1: string;
  public city: string;
  public zipcode: string;
  public phone: string;
  public email: string;

  constructor() {
    this.civility = 'M';
    this.firstname = '';
    this.lastname = '';
    this.addLine1 = '';
    this.city = '';
    this.zipcode = '';
    this.phone = '';
    this.email = '';
  }
}
