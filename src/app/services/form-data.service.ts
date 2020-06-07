import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { User } from '../models/user';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  user: User;

  constructor() {
    this.user = new User();
  }
}
