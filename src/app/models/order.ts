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
  isDelivered: boolean;
  mrExpedition: boolean;
  isSent: boolean;
  paymentAttempts: number;
  recipient: Recipient;
  buyerCode: string;
  buyerCodeGeneratedAt: Date;
  buyerCodeCheckAttempts: number;
  buyerCodeValidatedAt: Date;
  isBuyerCodeValidated: boolean;
  isAvailabilityConfirmed: boolean;
  isCanceled: boolean;
  isReadBuyer: boolean = false;
  isReadSeller: boolean = false;
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
    this.isDelivered = false;
    this.mrExpedition = null;
    this.isSent = false;
    this.paymentAttempts = null;
    this.recipient = new Recipient();
    this.buyerCode = '';
    this.buyerCodeGeneratedAt = new Date();
    this.buyerCodeCheckAttempts = 0;
    this.buyerCodeValidatedAt = new Date();
    this.isBuyerCodeValidated = null;
    this.isAvailabilityConfirmed = null;
    this.isCanceled = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
