import { DispatchNote } from 'src/app/models/dispatch-note';
import { ErrorMessageManagerService } from 'src/app/services/error-message-manager.service';
import { OrderRequestService } from 'src/app/services/order-request.service';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Order } from 'src/app/models/order';
import { Modals } from 'src/app/models/modals';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

  constructor(
    private request: RequestService,
    private orderRequest: OrderRequestService,
    public errorMessages: ErrorMessageManagerService
  ) { }

  public getOrderById(orderId: number): Observable<HttpResponse<any>> {
    return this.request.getData(this.request.uri.GET_ORDER, [orderId.toString()]);
  }

  public async getSellerOrders(): Promise<any[]> {
    return new Promise((resolve) => {
      this.orderRequest.getSellerOrders().subscribe(
        (orders: any) =>  {
          resolve(orders);
        }
      );
    });
  }

  /*
  ** CONDITIONS
  */

  public isAvailable(order: Order): boolean {
    return order.isAvailabilityConfirmed;
  }

  public isCanceled(order: Order): boolean {
    return order.isCanceled;
  }

  public isDeliveryNoteGenerated(order: any): boolean {
    return order.mrExpedition !== null;
  }

  public isRequiringAction(order: any): boolean {
    if (!this.isCanceled(order)) {
      if (this.isHandDelivery(order)) {
        return order.isDelivered === null;
      }
      else {
        return !this.isDeliveryNoteGenerated(order);
      }
    }
    else {
      return false;
    }
  }

  public isHandDelivery(order: any): boolean {
    return order.shipMethod === 'HandDelivery';
  }

  public isRelayDelivery(order: any): boolean {
    return order.shipMethod === 'RelayShip';
  }

  /*
  ** ACTIONS
  */

  public async sendOrder(order: Order): Promise<void> {
    return new Promise((resolve) => {
      this.orderRequest.sendOrder(order.id).subscribe(
        () => {
          order.isSent = true;
          resolve();
        }
      )
    });
  }

  public async confirmAvailability(order: Order): Promise<void> {
    this.orderRequest.confirmAvailability(order.id).subscribe({
      next: (res: any) => {
        order.isAvailabilityConfirmed = true;
      }
    });
  }

  public async denyAvailability(order: Order): Promise<void> {
    this.orderRequest.denyAvailability(order.id).subscribe({
      next: (res: any) => {
        if (res.isCanceled) {
          order.isCanceled = true;
        }
      }
    });
  }

  public async checkBuyerCode(order: Order, typedCode: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.orderRequest.checkBuyerCode(order.id, typedCode).subscribe({
        next: (res: any) => {
          resolve(res.isValid);
        },
        error: () => {
          this.errorMessages.addErrorMessage('Une erreur est survenue');
        }
      })
    });
  }

  public async confirmOrderDelivery(order: Order, typedCode: string, modals: Modals): Promise<void> {
    const isValid: boolean = await this.checkBuyerCode(order, typedCode);

    if (isValid) {
      order.isBuyerCodeValidated = true;
      modals.close('order-delivery-confirmation');
    }
    else {
      this.errorMessages.addErrorMessage('Le code que vous avez fourni est incorrect.');
    };
  }

  public async generateDispatchNote(order: any, dispatchNote: DispatchNote, modals: Modals, times: number = 3): Promise<void> {
    const payload: any = {
      'orderId': order.id
    };

    this.request.postData(payload, this.request.uri.GET_DISPATCH_NOTE).subscribe(
      (relayRes: any) => {
        if ((relayRes.body.URL_Etiquette_A4 === null || relayRes.body.URL_Etiquette_A5 === null) && times > 0) {
          this.generateDispatchNote(order, dispatchNote, modals, times--);
        }
        else {
          dispatchNote.a4 = relayRes.body.URL_Etiquette_A4;
          dispatchNote.a5 = relayRes.body.URL_Etiquette_A5;
        }
        modals.open('etiquette-download');
      }
    );
  }}
