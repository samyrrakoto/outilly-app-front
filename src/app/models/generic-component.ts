import { Media } from './media';

export class GenericComponent {
  media: Media;
  modals: any;

  constructor() {
    this.media = new Media();
  }

  openModal(modal: any): void {
    this.modals[modal] = 'is-active';
  }

  closeModal(modal: any): void {
    this.modals[modal] = '';
  }

  openMedia(mediaPath: string): void {
    this.media.path = mediaPath;
    this.media.modal = 'is-active';
  }

  closeMedia(): void {
    this.media.modal = '';
  }
}
