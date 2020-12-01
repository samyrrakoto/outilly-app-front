export class ProductMedia {
    id: number;
    path: string;
    link: string;
    type: string;
    isHosted: boolean;

    constructor(id: number = 0, type: string = 'image', path: string = '', link: string = '', isHosted: boolean = true) {
      this.id = id;
      this.type = type;
      this.path = path;
      this.link = link;
      this.isHosted = isHosted;
    }
}
