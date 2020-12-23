import { environment } from 'src/environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['../../product-information.component.css', './media-gallery.component.scss']
})
export class MediaGalleryComponent extends GenericComponent implements OnInit {
  @Input() sale: Sale;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  currentMediaIndex: number = 0;
  firstImage: string = '';

  constructor(
    public auth: AuthService,
    public saleManager: SaleManagerService)
  {
    super();
  }

  ngOnInit(): void {
    this.removeThumbnail();
    this.getFirstImage();
  }

  // Keyboard shortcuts
  public onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.nextMedia();
    }
    else if (event.key === 'ArrowLeft') {
      this.previousMedia();
    }
  }

  private removeThumbnail(): void {
    let i: number = 0;

    for (const media of this.sale.product.productMedias) {
      if (media.type === 'thumbnail') {
        this.sale.product.productMedias.splice(i, 1);
      }
      i++;
    }
  }

  public pauseVideo(videoId: string): void {
    const video: any = document.getElementById(videoId);

    if (video !== null) {
      video.pause();
    }
  }

  public openGalleryMedia(mediaIndex: number, mediaType: string): void {
    this.media.index = mediaIndex;
    this.media.path = this.sale.product.productMedias[mediaIndex].path;
    this.media.type = mediaType;
    this.media.modal = 'is-active';
  }

  public previousMedia(): void {
    const lastIndex = this.sale.product.productMedias.length - 1;

    this.media.index === 0 ? this.media.index = lastIndex : this.media.index -= 1;
    this.media.type = this.sale.product.productMedias[this.media.index].type;
    this.media.path = this.sale.product.productMedias[this.media.index].path;
  }

  public nextMedia(): void {
    const lastIndex = this.sale.product.productMedias.length - 1;

    this.media.index === lastIndex ? this.media.index = 0 : this.media.index++;
    this.media.type = this.sale.product.productMedias[this.media.index].type;
    this.media.path = this.sale.product.productMedias[this.media.index].path;
  }

  public getFirstImage(): void {
    for (const media of this.sale.product.productMedias) {
      if (media.type === 'image') {
        this.firstImage = "url('" + this.mediaBaseUri + media.path + "')";
        return;
      }
    }
  }

  public getBackgroundImgUrl(path: string): string {
    return "url('" + this.mediaBaseUri + path + "')";
  }

  public getNextMediaIndex(): void {
    if (this.currentMediaIndex === this.sale.product.productMedias.length - 1) {
      this.currentMediaIndex = 0;
    }
    else {
      this.currentMediaIndex++;
    }
  }

  public getPreviousMediaIndex(): void {
    if (this.currentMediaIndex === 0) {
      this.currentMediaIndex = this.sale.product.productMedias.length - 1;
    }
    else {
      this.currentMediaIndex--;
    }
  }
}
