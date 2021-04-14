import { EncodingService } from 'src/app/services/encoding.service';
import { Injectable } from '@angular/core';
import { EstimationRequestService } from 'src/app/services/estimation-request.service';
import { ProductRequestService } from 'src/app/services/product-request.service';
import { HttpStatus } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageType } from 'src/app/services/storage.service';
import { storage } from 'src/app/parameters';
import { FormDataService } from './form-data.service';

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
        id: localStorage.getItem(storage.ESTIMATION_ID),
        strId: localStorage.getItem(storage.ESTIMATION_STR_ID),
        name: 'estimation ' + localStorage.getItem(storage.ESTIMATION_ID),
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
        id: localStorage.getItem(storage.ESTIMATION_ID),
        strId: localStorage.getItem(storage.ESTIMATION_STR_ID)
      },
      hasInvoice: data.hasInvoice,
      quantity: data.quantity
    };

    await this.update(data);
    this.estimationRequest.estimate(payload).subscribe({
      next: (res: any) => {
        if (res.status === HttpStatus.CREATED) {
          this.estimationSent = true;
          this.removeData(data);
        }
      },
      error: () => {

      }
    });
  }

  private removeData(data: any): void {
    this.transferProductData(data);
    sessionStorage.removeItem(storage.ESTIMATION_DATA);
    sessionStorage.removeItem(storage.ESTIMATION_MEDIA);
    localStorage.removeItem(storage.ESTIMATION_ID);
    localStorage.removeItem(storage.ESTIMATION_STR_ID);
    this.auth.removeExclusiveStorageData(storage.ESTIMATION_MEDIA, StorageType.SESSION);
    this.auth.removeExclusiveStorageData(storage.ESTIMATION_DATA, StorageType.SESSION);
    this.auth.removeExclusiveStorageData(storage.ESTIMATION_ID);
    this.auth.removeExclusiveStorageData(storage.ESTIMATION_STR_ID);
    this.auth.resetRedirectionUrl();
  }

  private transferProductData(data: any): void {
    const formData: FormDataService = new FormDataService();

    formData.product.description = data.description;
    formData.product.productMedias = data.files;
    console.log(data);
    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem(storage.PRODUCT_ID, localStorage.getItem(storage.ESTIMATION_ID));
    localStorage.setItem(storage.PRODUCT_STR_ID, localStorage.getItem(storage.ESTIMATION_STR_ID));
  }
}
