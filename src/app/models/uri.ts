export class Uri {
    readonly base: string = "http://ktkp.api/";
    readonly USER: string = "user/";
    readonly CHECK: string = "check/";
    readonly CREATE: string = "create";
    readonly EXISTS: string = "exists";
    readonly SALE: string = "sale/";
    path: string;

    constructor () {
        this.path = "";
    }

    setUri(ressource: string, param: string) {
        this.path = this.base + ressource + param;
    }
}
