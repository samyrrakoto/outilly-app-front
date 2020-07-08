export class ProductMedia {
    id: number;
    path: string;
    link: string;
    type: string;
    isHosted: boolean;

    constructor() {
        this.id = 0;
        this.path = "";
        this.link = "";
        this.type = "image";
        this.isHosted = true;
    }
}
