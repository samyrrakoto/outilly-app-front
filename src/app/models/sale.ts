import { Bid } from './bid';
import { Product } from './product';
import { Seller } from './seller';

export class Sale {
    id: number;
    bids: Array<Bid>;
    updatedAt: Date;
    createdAt: Date;
    status: string;
    startDate: Date;
    endDate: Date;
    product: Product;
    productSlug: string;
    seller: Seller;

    constructor() {
        this.id = 0;
        this.bids = [];
        this.updatedAt = null;
        this.createdAt = null;
        this.status = "new";
        this.startDate = null;
        this.endDate = null;
        this.product = new Product();
        this.productSlug = '';
        this.seller = new Seller();
    }
}
