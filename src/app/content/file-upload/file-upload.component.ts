import { FileUploadManagerService } from 'src/app/services/file-upload-manager.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericComponent } from 'src/app/models/generic-component';
import { media } from 'src/app/parameters';
import { ProductMedia } from 'src/app/models/product-media';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent extends GenericComponent implements OnInit {
  readonly baseMediaUri: string = environment.mediaBaseUri;
  @Input() maxFiles: number = 10;
  @Input() mediaFormatAccepted: string = media.PICTURES_FORMAT_ACCEPTED;
  @Input() medias: ProductMedia[] = [];
  @Input() selectConditions: boolean = false;
  @Input() title: string = "Sélectionnez des images (maximum " + this.maxFiles + ")";
  @Input() showProgressBar: boolean = true;
  @Input() showMedias: boolean = true;
  @Input() triggerStorage: boolean = false;
  @Output() filesEmitter: EventEmitter<ProductMedia[]> = new EventEmitter<ProductMedia[]>();

  constructor(
    public fileUploadManager: FileUploadManagerService)
  {
    super();
    this.loadings.add('input');
  }

  ngOnInit(): void {
    if (this.medias) {
      this.fileUploadManager.productMedias = this.medias;
    }
  }

  public handleFile(event: any): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('product-pictures')).files;
    const nbFiles: number = files.length;

    if (nbFiles !== 0) {
      this.fileUploadManager.sendMedia(event, files, 0, nbFiles, this.loadings);
      this.filesEmitter.emit(this.fileUploadManager.productMedias);
    }
  }

  public openImgPicker(): void {
    document.getElementById("product-pictures").click();
  }

  public getBackgroundUrl(url: string): string {
    return "url(" + url + ")";
  }
}
