export class ProductMedia {
    id: number;
    path: string;
    link: string;
    type: string;
    isHosted: boolean;

    constructor(id: number = 0, path: string = '', link: string = '', type: string = 'image', isHosted: boolean = true) {
        this.id = id;
        this.path = path;
        this.link = link;
        this.type = type;
        this.isHosted = isHosted;
    }
}
