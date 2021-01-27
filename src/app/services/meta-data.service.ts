import { environment } from 'src/environments/environment';
import { pageInfo } from 'src/app/parameters';
import { Meta, Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {

  constructor(
    private title: Title,
    private meta: Meta
    )
  {}

  public updateTags(tag: string, description: string, partUrl: string, imgUri: string): void {
    const baseTitle: string = tag + pageInfo.PAGE_NAME_SEPARATOR + pageInfo.BRAND_NAME;
    const imgPath: string = environment.mediaBaseUri + imgUri;
    const urlPath: string = environment.frontBaseUri + partUrl;

    this.updateMeta(baseTitle, description, imgPath, urlPath);
  }

  private updateMeta(title: string, description: string, imgUri: string, url: string): void {
    this.updateTitle(title);
    this.updateDescription(description.replace(/<br \/>/g, ' '));
    this.updateImage(imgUri);
    this.updateUrl(url);
  }

  private updateTitle(title: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  private updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private updateImage(imgUri: string): void {
    this.meta.updateTag({ property: 'og:image', content: imgUri });
  }

  private updateUrl(url: string): void {
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}
