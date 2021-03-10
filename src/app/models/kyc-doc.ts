export class KycDoc {
  id: number = 0;
  file: File = null;
  name: string = '';
  type: KycType;
  path: string = '';
  page: KycSide;
  url: string = '';
  hasRecto: boolean = false;
  hasVerso: boolean = false;
  isSubmitted: boolean = null;

  constructor(type?: KycType, page?: KycSide) {
    this.type = type;
    this.page = page;
  }
}

export enum KycSide {
  RECTO = 'recto',
  VERSO = 'verso'
}

export enum KycType {
  ID_CARD = "carte d'identité",
  PASSPORT = "passeport"
}
