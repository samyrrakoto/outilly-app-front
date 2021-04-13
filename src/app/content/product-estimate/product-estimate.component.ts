import { FileUploadManagerService } from 'src/app/services/file-upload-manager.service';
import { ProductManagerService } from 'src/app/services/product-manager.service';
import { EstimationManagerService } from 'src/app/services/estimation-manager.service';
import { CONTACT } from 'src/app/marketing';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductMedia } from 'src/app/models/product-media';
import { Location } from '@angular/common';
import { StorageType } from 'src/app/services/storage.service';
import { storage } from 'src/app/parameters';

@Component({
  selector: 'app-product-estimate',
  templateUrl: './product-estimate.component.html',
  styleUrls: ['./product-estimate.component.css']
})
export class ProductEstimateComponent implements OnInit {
  readonly contactPhone: string = CONTACT.CHRIS;
  readonly min: number = 1;
  readonly max: number = 10;
  data: Data = new Data();
  files: ProductMedia[] = [];

  constructor(
    public auth: AuthService,
    public estimationManager: EstimationManagerService,
    private productManager: ProductManagerService,
    private fileUploadManager: FileUploadManagerService,
    private location: Location)
  {
    this.files = this.fileUploadManager.productMedias;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem(storage.ESTIMATION_DATA)) {
      this.data = JSON.parse(sessionStorage.getItem(storage.ESTIMATION_DATA));
    }
    if (localStorage.getItem(storage.ESTIMATION_ID) === null) {
      this.productManager.createProductEstimation();
    }
    if (sessionStorage.getItem(storage.ESTIMATION_MEDIA)) {
      this.files = JSON.parse(sessionStorage.getItem(storage.ESTIMATION_MEDIA));
    }
  }

  public getFilesEmitter(productMedias: ProductMedia[]): void {
    this.files = productMedias;
  }

  public isValid(): boolean {
    return this.files.length <= 10 && this.data.description.length > 0;
  }

  public setRedirection(): void {
    this.storeData();
    this.auth.setRedirectionUrl(this.location.path());
  }

  public storeData(): void {
    sessionStorage.setItem(storage.ESTIMATION_DATA, JSON.stringify(this.data));
    sessionStorage.setItem(storage.ESTIMATION_MEDIA, JSON.stringify(this.files));
    this.auth.addExclusiveStorageData(storage.ESTIMATION_MEDIA, StorageType.SESSION);
    this.auth.addExclusiveStorageData(storage.ESTIMATION_DATA, StorageType.SESSION);
    this.auth.addExclusiveStorageData(storage.ESTIMATION_ID);
    this.auth.addExclusiveStorageData(storage.ESTIMATION_STR_ID);
  }

  public resetData(): void {
    this.data = new Data();
    this.files = [];
    this.productManager.createProductEstimation();
    this.estimationManager.estimationSent = false;
  }
}

class Data {
  description: string = '';
  quantity: number = 0;
  hasInvoice: boolean = false;
}
