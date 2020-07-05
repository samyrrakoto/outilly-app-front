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
        this.name = "";
        this.reservePrice = 0;
        this.productCategories = [];
        this.quality = "";
        this.weight = 0;
        this.locality = "";
        this.productTypes = [];
        this.description = "Mais, vous savez, moi je ne crois pas qu'il y ait de bonne ou de mauvaise situation. " +
        "Moi, si je devais résumer ma vie aujourd'hui avec vous, je dirais que c'est d'abord des rencontres, des gens qui m'ont tendu la main, peut-être à un moment où je ne pouvais pas, où j'étais seul chez moi. " +
        "Et c'est assez curieux de se dire que les hasards, les rencontres forgent une destinée... " +
        "Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l'interlocuteur en face, je dirais, le miroir qui vous aide à avancer. " +
        "Alors ce n'est pas mon cas, comme je le disais là, puisque moi au contraire, j'ai pu ; et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... Je ne suis qu'amour ! " +
        "Et finalement, quand beaucoup de gens aujourd'hui me disent ''Mais comment fais-tu pour avoir cette humanité ?'', " +
        "eh ben je leur réponds très simplement, je leur dis que c'est ce goût de l'amour, ce goût donc qui m'a poussé aujourd'hui à entreprendre une construction mécanique, mais demain, qui sait, " +
        "peut-être seulement à me mettre au service de la communauté, à faire le don, le don de soi.";
        this.shortDescription = this.description.slice(0,150) + '...';
        this.isWarrantied = true;
        this.warrantyDuration = 0;
        this.strId = "";
        this.priceOfNew = 0;
        this.isBundle = false;
        this.brands = [];
        this.productMedias = [];
        this.activityDomains = [];
    }
}
