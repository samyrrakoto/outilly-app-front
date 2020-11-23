import { ProductReference } from './product-reference';
import { ProductCategory } from './product-category';
import { ProductType } from './product-type';
import { Brand } from './brand';
import { ProductMedia } from './product-media';
import { ActivityDomain } from './activity-domain';

export class Product {
  id: number;
  slug: string;
  name: string;
  reservePrice: number;
  isConsumable: boolean;
  productCategories: Array<ProductCategory>;
  productReferences: ProductReference[];
  quality: string;
  weight: number;
  weightUnity: string;
  locality: string;
  productTypes: Array<ProductType>;
  description: string;
  shortDescription: string;
  isWarrantied: boolean;
  todeliver: boolean;
  buyingOption: string;
  warrantyDuration: number;
  strId: string;
  priceOfNew: number;
  isBundle: boolean;
  brands: Array<Brand>;
  productMedias: Array<ProductMedia>;
  activityDomains: Array<ActivityDomain>;

  constructor() {
    this.id = 0;
    this.slug = '';
    this.name = '';
    this.reservePrice = 0;
    this.isConsumable = false;
    this.productCategories = [];
    this.productReferences = [];
    this.quality = '';
    this.weight = 0;
    this.weightUnity = 'kg';
    this.locality = '';
    this.productTypes = [];
    this.description = '';
    this.isWarrantied = true;
    this.todeliver = true;
    this.buyingOption = "classic";
    this.warrantyDuration = 0;
    this.strId = '';
    this.priceOfNew = 0;
    this.isBundle = false;
    this.brands = [];
    this.productMedias = [];
    this.activityDomains = [];
  }
}
