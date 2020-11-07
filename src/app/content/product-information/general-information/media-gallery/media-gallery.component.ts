import { Component, OnInit, Input } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { ProductInformationComponent } from '../../product-information.component';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent extends ProductInformationComponent implements OnInit {
  @Input() sale: Sale;

  constructor(request: RequestService,
    route: ActivatedRoute,
    bidManager: BidManagerService,
    public auth: AuthService,
    public saleManager: SaleManagerService) {
    super(request, route, bidManager, saleManager, auth);
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
