import { Component, OnInit, Input } from '@angular/core';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {

  @Input('sale') sale: Sale;

  constructor() { }

  ngOnInit(): void {
  }

}
