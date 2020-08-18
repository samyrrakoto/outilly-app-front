export class ProductCategory {
    id: number;
    label: string;

    constructor(id: number = 0, label: string = '') {
      this.id = id;
      this.label = label;
    }
}
