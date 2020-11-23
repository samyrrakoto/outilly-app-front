export class ProductCategory {
    id: number;
    label: string;

    constructor(label: string = '', id: number = 0) {
      this.id = id;
      this.label = label;
    }
}
