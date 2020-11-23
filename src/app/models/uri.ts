import { environment } from 'src/environments/environment';

export class Uri {
  readonly BASE: string;
  readonly BID: string = 'bid/';
  readonly SECURE: string = "secure/"
  readonly USER: string = 'user';
  readonly LOGIN: string = 'login/check';
  readonly CHECK: string = 'check/';
  readonly CREATE: string = 'create';
  readonly EXISTS: string = 'exists';
  readonly SALE: string = 'sale';
  readonly GENERIC_QUESTIONS: string = 'questions/generic';
  readonly PRODUCT_CREATION: string = 'product/create';
  readonly PRODUCT_UPDATE: string = 'secure/product/update';
  readonly SALE_CREATE: string = 'secure/sale/create';
  readonly GET_SALES_BY_IDS: string = 'secure/sales'
  readonly GET_SALES_SOLD: string = 'secure/sales/sold';
  readonly GET_SALES_ONLINE: string = 'secure/sales/online';
  readonly GET_SALES_NEW: string = 'secure/sales/new';
  readonly GET_SALE: string = 'sale/';
  readonly GET_SALE_VENDOR: string = 'secure/sale'
  readonly GET_SALE_AVAILABILITY: string = 'sale/availability'
  readonly GET_BIDS_AND_SALES = 'secure/bids/sales';
  readonly ACTIVITY_DOMAINS: string = 'activity-domains';
  readonly BRANDS: string = 'brands';
  readonly CATEGORIES: string = 'product/categories/all';
  readonly TYPES: string = 'product/types/all';
  readonly REFERENCES: string = 'product/refs/categories';
  readonly PRODUCT_MEDIA_CREATE: string = 'product/media/create';
  readonly GET_USER: string = 'secure/user';
  readonly UPDATE_USER: string = 'secure/user/update';
  readonly UPDATE_PWD: string = 'secure/pwd-reset';
  readonly DELETE_ADDRESS: string = 'secure/address';
  readonly ADD_ADDRESS: string = 'secure/address/';
  readonly UPDATE_ADDRESS: string = 'secure/address/';
  readonly PLACE_BID: string = 'secure/bid/place';
  readonly ACCEPT_OFFER: string = 'secure/bid/update-acceptance';
  readonly DECLINE_OFFER: string = 'secure/bid/update-acceptance';
  readonly COUNTER_OFFER: string = 'secure/bid/place/counter-offer';
  readonly GET_RELAY_POINT: string = 'mondialrelay/relaypoint'
  readonly GET_PREAUTH_DATA: string = 'secure/mangopay/preauth/check';
  readonly GET_TRANSACTION_DATA: string = 'secure/mangopay/transaction/check';
  readonly CREATE_ORDER: string = 'secure/order/create';
  readonly GET_ORDER: string = 'secure/order';
  readonly GET_SELLER_ORDERS: string = 'secure/orders/validated/seller';
  readonly GET_BUYER_ORDERS: string = 'secure/orders/validated/buyer';
  readonly PREREGISTER: string = 'secure/mangopay/user/card/preregister';
  readonly UPDATE_REGISTRATION: string = 'secure/mangopay/user/card/update-registration';
  readonly PREAUTH: string = 'secure/mangopay/preauth';
  path: string;

  constructor() {
    this.BASE = environment.apiBaseUri;
    this.path = '';
  }

  public setUri(ressource: string, params: Array<string>): void {
    this.path = this.BASE + ressource;

    for (const param of params) {
      this.path += '/' + param;
    }
  }}
