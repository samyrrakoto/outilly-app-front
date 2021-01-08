export class Purchase {
  sale: any;
  slug: string;
  updatedAt: Date;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  productName: string;
  reservePrice: number;
  bidId: number;
  bidAmount: number;
  counterOfferAmount: number;
  isClosed: boolean;
  isAccepted: boolean;
  isRead: boolean;

  constructor(purchase: any) {
    this.sale = purchase.sale;
    this.updatedAt = purchase.updatedAt;
    this.createdAt = purchase.createdAt;
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
    this.isRead = purchase.isReadBuyer;
  }
}
