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
    readonly GENERIC_QUESTIONS = 'questions/generic';
    readonly PRODUCT_CREATION = 'product/create';
    path: string;

    constructor() {
        this.BASE = environment.apiBaseUri;
        this.path = '';
    }

    setUri(ressource: string, param: string) {
        this.path = this.BASE + ressource + param;
    }
}
