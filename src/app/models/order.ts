import { Recipient } from './recipient';

export class Order {
  id: number;
  saleId: number;
  bidId: number;
  billingAddressId: number;
  shippingAddressId: number;
  relayCountry: string;
  relayPointId: string;
  amountPrice: number;
  amountShipment: number;
  amountFees: number;
  amountTotal: number;
  shipMethod: string;
  collMethod: string;
  paymentAttempts: number;
  recipient: Recipient;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.saleId = 0;
    this.bidId = 0;
    this.billingAddressId = 0;
    this.shippingAddressId = 0;
    this.relayCountry = '';
    this.relayPointId = '';
    this.amountPrice = 0;
    this.amountFees = 0;
    this.amountTotal = 0;
    this.shipMethod = '';
    this.collMethod = '';
    this.paymentAttempts = null;
    this.recipient = new Recipient();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
