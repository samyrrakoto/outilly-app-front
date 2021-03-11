import { Loadings } from 'src/app/models/loadings';
import { Media } from 'src/app/models/media';
import { Modals } from 'src/app/models/modals';

export class GenericComponent {
  media: Media;
  modals: Modals = new Modals();
  loadings: Loadings = new Loadings();

  constructor() {
    this.media = new Media();
  }

  public openMedia(mediaPath: string): void {
    this.media.path = mediaPath;
    this.media.modal = 'is-active';
  }

  public closeMedia(): void {
    this.media.modal = '';
  }
}
