import { ProductCategory } from './product-category';
import { ProductType } from './product-type';
import { Brand } from './brand';
import { ProductMedia } from './product-media';
import { ActivityDomain } from './activity-domain';

export class Product {
    id: number;
    name: string;
    reservePrice: number;
    productCategories: Array<ProductCategory>;
    quality: string;
    weight: number;
    locality: string;
    productTypes: Array<ProductType>;
    description: string;
    shortDescription: string;
    isWarrantied: boolean;
    warrantyDuration: number;
    strId: string;
    priceOfNew: number;
    isBundle: boolean;
    brands: Array<Brand>;
    productMedias: Array<ProductMedia>;
    activityDomains: Array<ActivityDomain>;

    constructor() {
        this.id = 0;
        this.name = '';
        this.reservePrice = 0;
        this.productCategories = [];
        this.quality = '';
        this.weight = 0;
        this.locality = '';
        this.productTypes = [];
        this.description = '';
        this.isWarrantied = true;
        this.warrantyDuration = 0;
        this.strId = '';
        this.priceOfNew = 0;
        this.isBundle = false;
        this.brands = [];
        this.productMedias = [];
        this.activityDomains = [];
    }
}
