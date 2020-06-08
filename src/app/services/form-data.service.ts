import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  user: User;

  constructor() {
    this.user = new User();
  }
}
