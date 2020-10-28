export class Order {
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

  constructor() {
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
  }
}
