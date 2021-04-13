import { ProductMedia } from 'src/app/models/product-media';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadRequestService {

  constructor(
    private http: HttpClient,
    private request: RequestService
  ) { }

  public uploadMedia(data: any): Observable<any> {
    return this.http.post(this.request.uri.BASE + this.request.uri.PRODUCT_MEDIA_CREATE, data,
      {
        headers: null,
        reportProgress: true,
        observe: 'events',
    });
  }

  public cancelMedia(productId: string, productStrId: string, media: ProductMedia): Observable<any> {
    return this.request.deleteData(this.request.uri.DELETE_MEDIA, null, [productId, productStrId, media.id.toString()]);
  }
}
