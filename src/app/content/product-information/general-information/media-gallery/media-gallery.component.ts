import { BidManagerService } from './../../../../bid-manager.service';
import { Component, OnInit, Input } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;

  constructor(request: RequestService, route: ActivatedRoute, bidManager: BidManagerService) {
    super(request, route, bidManager);
  }

  ngOnInit(): void {}

  // Keyboard shortcuts
  onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.nextMedia();
    }
    else if (event.key === 'ArrowLeft') {
      this.previousMedia();
    }
  }

  pauseVideo(videoId: string): void {
    const video: any = document.getElementById(videoId);

    if (video !== null) {
      video.pause();
    }
  }
}
