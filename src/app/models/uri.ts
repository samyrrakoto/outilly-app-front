export class Uri {
    readonly base: string = 'http://ktkp.api/';
    readonly secure: string = 'secure/';
    readonly BID: string = 'bid/';
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
        this.path = this.base + ressource + param;
    }
}
