import { Sale } from './sale';
export class Purchase {
  saleId: number;
  slug: string;
  startDate: Date;
  endDate: Date;
  productName: string;
  reservePrice: number;
  bidId: number;
  bidAmount: number;
  counterOfferAmount: number;
  isClosed: boolean;
  isAccepted: boolean;

  constructor(purchase: any) {
    this.saleId = purchase.sale.id;
    this.slug = '';
    this.startDate = purchase.sale.startDate;
    this.endDate = purchase.sale.endDate;
    this.productName = purchase.sale.product.name;
    this.reservePrice = purchase.sale.product.reservePrice;
    this.bidId = purchase.id;
    this.bidAmount = purchase.amount;
    this.counterOfferAmount = purchase.counterOfferAmount;
    this.isClosed = purchase.isClosed;
    this.isAccepted = purchase.isAccepted;
  }
}
