export class ProductMedia {
    id: number;
    file: File;
    path: string;
    link: string;
    type: string;
    isHosted: boolean;

    constructor(file: File = null, type: string = 'image', path: string = '', link: string = '', isHosted: boolean = true) {
        this.file = file;
        this.type = type;
        this.path = path;
        this.link = link;
        this.isHosted = isHosted;
    }
}
