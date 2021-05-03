import { environment } from 'src/environments/environment';

export class Uri {
  readonly BASE: string;
  readonly BID: string = 'bid/';
  readonly SECURE: string = "secure/"
  readonly USER: string = 'user';

  // Sale routes
  readonly SALE: string = 'sale';
  readonly SALES: string = 'sales';
  readonly SALE_CREATE: string = 'secure/sale/create';
  readonly GET_SALES_BY_IDS: string = 'secure/sales'
  readonly GET_SALES_SOLD: string = 'secure/sales/sold';
  readonly GET_SALES_ONLINE: string = 'secure/sales/online';
  readonly GET_SALES_NEW: string = 'secure/sales/new';
  readonly GET_SALE: string = 'sale';
  readonly GET_SALE_VENDOR: string = 'secure/sale';
  readonly GET_SALE_AVAILABILITY: string = 'sale/check/availability';
  readonly GET_BIDS_AND_SALES = 'secure/bids/sales';
  readonly DELETE_SALE = 'secure/sale/soft-delete';
  readonly BRANDS: string = 'brands';
  readonly CATEGORIES: string = 'product/categories/all';
  readonly TYPES: string = 'product/types/all';
  readonly REFERENCES: string = 'product/refs/categories';
  readonly PRODUCT_MEDIA_CREATE: string = 'product/media/create';
  readonly DELETE_MEDIA: string = 'product/media';

  // Product routes
  readonly PRODUCT_BY_CATEGORY: string = 'product/category'
  readonly GENERIC_QUESTIONS: string = 'questions/generic';
  readonly FAQ: string = 'faq';
  readonly FAQ_BUYER: string = 'faq/1';
  readonly FAQ_SELLER: string = 'faq/2';
  readonly FAQ_PRODUCT: string = 'faq/3';
  readonly PRODUCT_CREATION: string = 'product/create';
  readonly PRODUCT_UPDATE: string = 'secure/product/update';
  readonly ASK_PRODUCT_QUESTION: string = 'secure/question/product/ask';
  readonly ANSWER_PRODUCT_QUESTION: string = 'secure/question/product/answer';
  readonly PRODUCT_ESTIMATE: string = 'secure/product/estimation/create';

  // User Routes
  readonly GET_USER: string = 'secure/user';
  readonly UPDATE_USER: string = 'secure/user/update';
  readonly NEW_PWD: string ='pwd-reset';
  readonly UPDATE_PWD: string = 'secure/pwd-reset';
  readonly PWD_REQUEST: string = 'pwd-reset/request';
  readonly DELETE_ADDRESS: string = 'secure/address';
  readonly ADD_ADDRESS: string = 'secure/address/';
  readonly UPDATE_ADDRESS: string = 'secure/address/';
  readonly CREATE_COMPANY: string = 'secure/company/create';

  // KYC routes
  readonly BANK_INFO: string = 'secure/mangopay/user/bank-account/view';
  readonly CREATE_KYC_DOC: string = 'secure/mangopay/user/kyc/create-doc';
  readonly STORE_KYC_DOC: string = 'secure/mangopay/user/kyc/store-doc';
  readonly ADD_KYC_PAGE: string = 'secure/mangopay/user/kyc/add-page';
  readonly ASK_KYC_VALIDATION: string = 'secure/mangopay/user/kyc/ask-validation';
  readonly KYC_VALIDATION_STATUS: string = 'secure/mangopay/user/kyc/validation-status';
  readonly BANK_ACCOUNT_REGISTRATION: string = 'secure/mangopay/user/bank-account/register';

  // Geo routes
  readonly GET_GPS: string = 'address/geocode';

  // Bid routes
  readonly READ_BID: string = 'secure/bid/read/';
  readonly PLACE_BID: string = 'secure/bid/place';
  readonly ACCEPT_OFFER: string = 'secure/bid/update-acceptance';
  readonly DECLINE_OFFER: string = 'secure/bid/update-acceptance';
  readonly COUNTER_OFFER: string = 'secure/bid/place/counter-offer';

  // Order routes
  readonly MONDIAL_RELAY_COSTS: string = 'mondialrelay/cost-delay';
  readonly SEND_ORDER: string = 'secure/order/sent';
  readonly READ_ORDER_BUYER: string = 'secure/order/read/buyer';
  readonly READ_ORDER_SELLER: string = 'secure/order/read/seller'
  readonly ORDER_RECEPTION_CONFIRMATION: string = 'secure/order/delivered';
  readonly GET_RELAY_POINT: string = 'mondialrelay/relaypoint';
  readonly CREATE_RELAY_EXPEDITION: string ='secure/mondialrelay/expedition';
  readonly GET_DISPATCH_NOTE: string = 'secure/mondialrelay/etiquette';
  readonly GET_PREAUTH_DATA: string = 'secure/mangopay/preauth/check';
  readonly GET_TRANSACTION_DATA: string = 'secure/mangopay/transaction/check';
  readonly CREATE_ORDER: string = 'secure/order/create';
  readonly GET_ORDER: string = 'secure/order';
  readonly GET_SELLER_ORDERS: string = 'secure/orders/validated/seller';
  readonly GET_BUYER_ORDERS: string = 'secure/orders/validated/buyer';
  readonly ORDER_VALIDITY_CONFIRMATION: string = 'secure/order/confirm-availability';
  readonly ORDER_AVAILABILITY_DENIAL: string = 'secure/order/product-unavailable';
  readonly CHECK_BUYER_CODE: string = 'secure/order/buyer-code/check';
  readonly MR_ORDER_TRACKING: string = 'secure/mondialrelay/tracing/order';

  // Payment routes
  readonly PREREGISTER: string = 'secure/mangopay/user/card/preregister';
  readonly UPDATE_REGISTRATION: string = 'secure/mangopay/user/card/update-registration';
  readonly PREAUTH: string = 'secure/mangopay/preauth';

  // Other routes
  readonly CHECK_EXIST: string = 'check/exists';
  readonly LOGIN: string = 'login/check';
  readonly USER_ACTIVATION: string = 'user/activate';
  readonly SEND_ACTIVATION_MAIL: string = 'user/send-activation-token';
  readonly CHECK: string = 'check/';
  readonly CREATE: string = 'create';
  readonly EXISTS: string = 'exists';
  readonly SEND_CONTACT_REQUEST = 'contact-request';

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
