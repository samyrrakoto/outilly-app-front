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
  hasAccount: boolean;
  isProductComplete: boolean;
  isAccountComplete: boolean;

  constructor() {
    this.user = new User();
    this.product = new Product();
    this.pwdConfirmation = "";
    this.fieldName = "";
    this.path = new Path();
    this.hasAccount = false;
    this.isAccountComplete = false;
    this.isProductComplete = false;
  }
}
