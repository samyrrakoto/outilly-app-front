export class Bid {
  id: number;
  bidderId: number;
  saleId: number;
  amount: number;
  counterOfferAmount: number;
  isAccepted: boolean;
  isClosed: boolean;

  constructor() {
    this.id = 0;
    this.bidderId = 0;
    this.saleId = 0;
    this.amount = 0;
    this.counterOfferAmount = 0;
    this.isAccepted = null;
    this.isClosed = null;
  }
}
