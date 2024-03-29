import { FileUploadRequestService } from 'src/app/services/file-upload-request.service';
import { HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loadings } from 'src/app/models/loadings';
import { ProductMedia } from 'src/app/models/product-media';
import { media, storage } from 'src/app/parameters';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadManagerService {
  productMedias: ProductMedia[] = [];
  percentDone: number = 0;
  maxNbFiles: number = media.MAX_UPLOAD_PICTURES;

  constructor(
    private fileUploadRequest: FileUploadRequestService,
    private request: RequestService
  ) { }

    public getPercents(): number {
      return this.percentDone;
    }

  public getFormData(file: File): FormData {
    const formData: FormData = new FormData();

    formData.append('mediaFile', file);
    formData.append('productId', localStorage.getItem(storage.ESTIMATION_ID));
    formData.append('productStrId', localStorage.getItem(storage.ESTIMATION_STR_ID));
    formData.append('mediaType', 'image');
    return formData;
  }

  private async onSelectFile(event: any, media: ProductMedia, index: number = 0): Promise<void> {
    return new Promise((resolve) => {
      if (event.target.files && event.target.files[index]) {
        const reader: FileReader = new FileReader();

        reader.readAsDataURL(event.target.files[index]);
        media.file = event.target.files[index];

        reader.onload = (event: any) => {
          media.path = (<string>event.target.result);
          resolve();
        }
      }
    });
  }

  private async addMedia(media: any, index: number, event: any): Promise<void> {
    const path: string = media.path;

    await this.onSelectFile(event, media, index);
    this.productMedias.push(new ProductMedia(media.id, media.type, path, media.link, media.isHosted, media.file));
  }

  public removeMedia(id: number): void {
    for (let i = 0; i < this.productMedias.length; i++) {
      if (this.productMedias[i].id === id) {
        this.productMedias.splice(i, 1);
      }
    }
  }

  public cancelMedia(media: ProductMedia): void {
    const productId: string = localStorage.getItem(storage.ESTIMATION_ID);
    const productStrId: string = localStorage.getItem(storage.ESTIMATION_STR_ID);

    this.fileUploadRequest.cancelMedia(productId, productStrId, media).subscribe(
      (res: any) => {
        if (res.deleted) {
          this.removeMedia(media.id);
        }
      }
    )
  }

  public async sendMedia(event: any, files: FileList, index: number, nbFiles: number, loadings: Loadings): Promise<void> {
    const data: FormData = this.getFormData(files[index]);

    this.fileUploadRequest.uploadMedia(data).subscribe(
      (media: any) => {
        loadings.load('input');

        if (media.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * media.loaded / media.total);
        }
        if (media.type === HttpEventType.Response) {
          loadings.unload('input');
          this.addMedia(media.body, index, event);
          this.percentDone = 0;
          if (index + 1 < nbFiles && index + 1 < this.maxNbFiles) {
            this.sendMedia(event, files, index + 1, nbFiles, loadings);
          }
        }
      }
    );
  }
}
