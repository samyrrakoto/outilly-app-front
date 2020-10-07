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
    readonly ACTIVITY_DOMAINS: string = 'activity-domains';
    readonly BRANDS: string = 'brands';
    readonly CATEGORIES: string = 'product/categories/all';
    readonly TYPES: string = 'product/types/all';
    readonly PRODUCT_MEDIA_CREATE = 'product/media/create';
    readonly GET_USER = 'secure/user';
    readonly UPDATE_USER = 'secure/user/update';
    readonly UPDATE_PWD = 'secure/pwd-reset';
    path: string;

    constructor() {
        this.BASE = environment.apiBaseUri;
        this.path = '';
    }

    setUri(ressource: string, param: string) {
        this.path = this.BASE + ressource + param;
    }
}
