import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Path } from '../models/Path/path';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  user: User;
  pwdConfirmation: string;
  fieldName: string;
  path: Path;
  product: Product;

  constructor() {
    this.user = new User();
    this.pwdConfirmation = "";
    this.fieldName = "";
    this.path = new Path();
  }
}
