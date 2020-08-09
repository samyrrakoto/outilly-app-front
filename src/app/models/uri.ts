export class Uri {
    readonly BASE: string = 'http://ktkp.api/';
    readonly BID: string = 'bid/';
    readonly SECURE: string = "secure/"
    readonly USER: string = 'user/';
    readonly LOGIN: string = 'login/check';
    readonly CHECK: string = 'check/';
    readonly CREATE: string = 'create';
    readonly EXISTS: string = 'exists';
    readonly SALE: string = 'sale/';
    readonly GENERIC_QUESTIONS = 'questions/generic';
    path: string;

    constructor() {
        this.path = '';
    }

    setUri(ressource: string, param: string) {
        this.path = this.BASE + ressource + param;
    }
}
