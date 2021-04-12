import { EncodingService } from 'src/app/services/encoding.service';
import { Injectable } from '@angular/core';
import { EstimationRequestService } from 'src/app/services/estimation-request.service';
import { ProductRequestService } from 'src/app/services/product-request.service';
import { HttpStatus } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageType } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EstimationManagerService {
  estimationSent: boolean = false;

  constructor(
    private estimationRequest: EstimationRequestService,
    private productRequest: ProductRequestService,
    private encoding: EncodingService,
    private auth: AuthService
  ) { }

  private async update(data: any): Promise<void> {
    const payload: any = {
      product: {
        id: localStorage.getItem('id'),
        strId: localStorage.getItem('strId'),
        name: 'estimation ' + localStorage.getItem('id'),
        description: this.encoding.base64Encoder(data.description),
        isDescriptionBase64: true
      }
    };

    return new Promise((resolve) => {
      this.productRequest.updateProduct(payload).subscribe({
        next: (res: any) => {
          resolve();
        }
      });
    });
  }

  public async estimate(data: any): Promise<void> {
    const payload: any = {
      product: {
        id: localStorage.getItem('id'),
        strId: localStorage.getItem('strId')
      },
      hasInvoice: data.hasInvoice,
      quantity: data.quantity
    };

    await this.update(data);
    this.estimationRequest.estimate(payload).subscribe({
      next: (res: any) => {
        if (res.status === HttpStatus.CREATED) {
          this.estimationSent = true;
          this.removeData();
        }
      },
      error: () => {

      }
    });
  }

  private removeData(): void {
    sessionStorage.removeItem('estimationData');
    sessionStorage.removeItem('estimationMedia');
    this.auth.removeExclusiveStorageData('estimationMedia', StorageType.SESSION);
    this.auth.removeExclusiveStorageData('estimationData', StorageType.SESSION);
    this.auth.removeExclusiveStorageData('id');
    this.auth.removeExclusiveStorageData('strId');
    this.auth.resetRedirectionUrl();
  }
}
