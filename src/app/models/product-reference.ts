export class ProductReference {
  public id: number;
  public label: string;

  constructor(label: string = '', id: number = 0) {
    this.label = label;
    this.id = id;
  }
}
