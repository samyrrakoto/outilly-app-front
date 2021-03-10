import { GenericComponent } from 'src/app/models/generic-component';
import { KycManagerService } from 'src/app/services/kyc-manager.service';
import { Subject } from 'rxjs';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { KycSide, KycType } from 'src/app/models/kyc-doc';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent extends GenericComponent implements OnInit {
  @ViewChild('kycInput') kycInput: ElementRef;
  currentKycPage: KycSide = null;
  currentKycType: KycType = KycType.ID_CARD;
  click: Subject<any> = new Subject<any>();
  readonly tiles: string[] = ['id-card', 'passport'];
  readonly acceptedKycFormats: string[] = [];
  readonly chosenSubject: string = 'Je souhaite modifier mes coordonnées bancaires';
  readonly message: string = `Je souhaite changer de RIB. Voici mes nouvelles coordonnées bancaires :`;

  constructor(
    public userManager: UserManagerService,
    public kycManager: KycManagerService)
  {
    super();
    this.modals.addModal('id');
    this.modals.addModal('bank-account');
    this.modals.addModal('modify-bank-account');
    this.modals.addModal('contact-form');
    this.loadings.add('kyc');
  }

  ngOnInit(): void {
    this.kycManager.getBankInfo()
      .catch(() => null);
  }

  ngAfterViewInit(): void {
    this.setFocus('id-card');
  }

  public openKycPicker(page: string): void {
    this.currentKycPage = page === 'verso' ? KycSide.VERSO : KycSide.RECTO;
    this.kycInput.nativeElement.click();
  }

  public addKycId(): void {
    this.currentKycType = KycType.ID_CARD;
  }

  public addKycPassport(): void {
    this.currentKycType = KycType.PASSPORT;
  }

  public isKycPassport(): boolean {
    return this.currentKycType === KycType.PASSPORT;
  }

  public setFocus(id: string): void {
    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of this.tiles) {
      if (tile !== id) {
        if (document.getElementById(tile)) {
        document.getElementById(tile).classList.remove('chosen-tile');
        }
      }
    }
  }
}
