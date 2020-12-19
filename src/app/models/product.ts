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
  mainImage: any;
  quality: string;
  weight: number;
  weightUnity: string;
  locality: string;
  productTypes: Array<ProductType>;
  description: string;
  shortDescription: string;
  isWarrantied: boolean;
  toDeliver: boolean;
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
    this.strId = '';
    this.slug = '';
    this.name = '';
    this.description = '';
    this.reservePrice = null;
    this.isConsumable = null;
    this.productCategories = [];
    this.productReferences = [];
    this.productTypes = [];
    this.brands = [];
    this.mainImage = {
      id: 0,
      path: ''
    };
    this.quality = '';
    this.weight = null;
    this.weightUnity = 'kg';
    this.locality = '';
    this.isWarrantied = null;
    this.toDeliver = null;
    this.buyingOption = "classic";
    this.warrantyDuration = null;
    this.priceOfNew = null;
    this.isBundle = false;
    this.productMedias = [];
    this.activityDomains = [];
  }
}
