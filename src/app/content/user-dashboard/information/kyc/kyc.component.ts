import { KycManagerService } from 'src/app/services/kyc-manager.service';
import { Subject } from 'rxjs';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Modals } from 'src/app/models/modals';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { KycSide } from 'src/app/models/kyc-doc';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  @ViewChild('kycInput') kycInput: ElementRef;
  loading: boolean = false;
  modals: Modals = new Modals();
  click: Subject<any> = new Subject<any>();
  readonly tiles: string[] = ['id-card', 'passport'];
  readonly acceptedKycFormats: string[] = [];
  readonly chosenSubject: string = 'Je souhaite modifier mes coordonnées bancaires';
  readonly message: string = `Je souhaite changer de RIB. Voici mes nouvelles coordonnées bancaires :`;

  constructor(
    public userManager: UserManagerService,
    public kycManager: KycManagerService)
  {
    this.modals.addModal('id');
    this.modals.addModal('bank-account');
    this.modals.addModal('modify-bank-account');
    this.modals.addModal('contact-form');
  }

  ngOnInit(): void {
    this.kycManager.getBankInfo()
      .catch(() => null);
  }

  public openKycPicker(page: string): void {
    this.kycManager.currentKycDoc.page = page === 'verso' ? KycSide.RECTO : KycSide.VERSO;
    this.kycInput.nativeElement.click();
  }

  public setFocus(id: string): void {
    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of this.tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
