import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  user: User;
  filled: boolean;

  constructor() {
    this.user = new User();
    this.filled = false;
  }
}
