import { Media } from './media';
import { Modals } from './modals';

export class GenericComponent {
  media: Media;
  modals: Modals = new Modals();

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
