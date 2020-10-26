import { environment } from './../../environments/environment';

export class Uri {
  readonly BASE: string;
  readonly BID: string = 'bid/';
  readonly SECURE: string = "secure/"
  readonly USER: string = 'user/';
  readonly LOGIN: string = 'login/check';
  readonly CHECK: string = 'check/';
  readonly CREATE: string = 'create';
  readonly EXISTS: string = 'exists';
  readonly SALE: string = 'sale/';
  readonly GENERIC_QUESTIONS: string = 'questions/generic';
  readonly PRODUCT_CREATION: string = 'product/create';
  readonly PRODUCT_UPDATE: string = 'secure/product/update';
  readonly SALE_CREATE: string = 'secure/sale/create';
  readonly GET_SALE: string = 'sale/';
  readonly GET_BIDS_AND_SALES = 'secure/bids/sales';
  readonly ACTIVITY_DOMAINS: string = 'activity-domains';
  readonly BRANDS: string = 'brands';
  readonly CATEGORIES: string = 'product/categories/all';
  readonly TYPES: string = 'product/types/all';
  readonly PRODUCT_MEDIA_CREATE = 'product/media/create';
  readonly GET_USER = 'secure/user';
  readonly UPDATE_USER = 'secure/user/update';
  readonly UPDATE_PWD = 'secure/pwd-reset';
  readonly DELETE_ADDRESS = 'secure/address/';
  readonly ADD_ADDRESS = 'secure/address/';
  readonly UPDATE_ADDRESS = 'secure/address/';
  readonly PLACE_BID = 'secure/bid/place';
  readonly ACCEPT_OFFER = 'secure/bid/update-acceptance';
  readonly DECLINE_OFFER = 'secure/bid/update-acceptance';
  readonly COUNTER_OFFER = 'secure/bid/place/counter-offer';
  readonly GET_RELAY_POINT = 'mondialrelay/relaypoint/'
  readonly GET_PREAUTH_DATA = 'secure/mangopay/preauth/check';
  readonly GET_TRANSACTION_DATA = 'secure/mangopay/transaction/check';
  path: string;

  constructor() {
    this.BASE = environment.apiBaseUri;
    this.path = '';
  }

  setUri(ressource: string, param: string) {
    this.path = this.BASE + ressource + param;
  }

  setUri2(ressource: string, params: Array<string>) {
    this.path = this.BASE + ressource;

    for (const param of params) {
      this.path += param + '/';
    }
  }}
