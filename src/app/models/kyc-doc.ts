export class KycDoc {
  id: number = 0;
  name: string = '';
  type: string = '';
  path: string = '';
  page: KycSide = null;
  url: string = '';
  hasRecto: boolean = false;
  hasVerso: boolean = false;
  isSubmitted: boolean = null;
}

export enum KycSide {
  RECTO = 'recto',
  VERSO = 'verso'
}

export enum KycType {
  ID_CARD = "carte d'identité",
  PASSPORT = "passeport"
}
