import { Injectable } from '@angular/core';
import { PersonalDetails } from '../models/personal-details';
import { AddressDetails } from '../models/address-details';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  personalDetails : PersonalDetails;
  addressDetails : AddressDetails;

  constructor() {
    this.personalDetails = new PersonalDetails();
    this.addressDetails = new AddressDetails();
  }

  postData(){
    let newCombinedObject = {
      personalDetails : this.personalDetails, 
      country : this.addressDetails.country,
      street : this.addressDetails.street,
      zipcode : this.addressDetails.zipCode
    }
  }
}
