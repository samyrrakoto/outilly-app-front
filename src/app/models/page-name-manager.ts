import { pageInfo } from 'src/app/parameters';
import { Title } from '@angular/platform-browser';

export class PageNameManager {
  brandName: string = pageInfo.BRAND_NAME;
  separator: string = pageInfo.PAGE_NAME_SEPARATOR;

  constructor(private title: Title) {}

  public setTitle(pageName: string, format: string = 'brandLast'): void {
    switch(format) {
      case 'brandLast':
        this.title.setTitle(pageName + this.separator + this.brandName);
        break;
      case 'brandFirst':
        this.title.setTitle(this.brandName + this.separator + pageName);
        break;
    }
  }
}
