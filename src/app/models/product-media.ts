export class ProductMedia {
    id: number;
    file: File;
    path: string;
    link: string;
    type: string;
    isHosted: boolean;

    constructor(id: number = 0, type: string = 'image', path: string = '', link: string = '', isHosted: boolean = true, file = null) {
      this.id = id;
      this.file = file;
      this.type = type;
      this.path = path;
      this.link = link;
      this.isHosted = isHosted;
    }
}
