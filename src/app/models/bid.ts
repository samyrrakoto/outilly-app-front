import { Sale } from './sale';
import { Bidder } from './bidder';
export class Bid {
  id: number;
  bidder: Bidder;
  sale: Sale;
  amount: number;
  counterOfferAmount: number;
  isAccepted: boolean;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;

  constructor(id: number = 0) {
    this.id = id;
    this.bidder = new Bidder();
    this.sale = new Sale();
    this.amount = 0;
    this.counterOfferAmount = 0;
    this.isAccepted = null;
    this.isClosed = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isRead = false;
  }
}
