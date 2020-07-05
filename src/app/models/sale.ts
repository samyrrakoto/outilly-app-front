import { Product } from './product';
import { Seller } from './seller';

export class Sale {
    id: number;
    status: string;
    startDate: Date;
    endDate: Date;
    product: Product;
    seller: Seller;

    constructor() {
        this.id = 0;
        this.status = "new";
        this.startDate = null;
        this.endDate = null;
        this.product = new Product();
        this.seller = new Seller();
    }
}
