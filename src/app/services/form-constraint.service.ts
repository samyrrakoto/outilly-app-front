import { ErrorMessageManagerService } from './error-message-manager.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormConstraintService {

  constructor(public errorMessageManager: ErrorMessageManagerService) {}

  public isEmpty(field: any): boolean {
    const message: string = 'Ce champ est requis';
    let hasError: boolean;

    // Depending on the type we set a null value
    if (typeof field === "string") hasError = field === "";
    else if (typeof field === "number") hasError = field === 0;
    else if (field instanceof Date) hasError = field === null;
    else if (field instanceof Array) hasError = field.length === 0;
    else if (typeof field === "boolean") hasError = field === null;

    if (hasError) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public hasNotEnoughElements(field: Array<any>, nb: number = 2): boolean {
    const message: string = "Vous devez sélectionner au moins " + nb + " éléments";

    if (field.length < nb) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public isNotNum(field: string) {
    const message: string = "Le champ doit contenir uniquement des chiffres !";
    const regex: RegExp = /^[0-9]+$/;

    if (!field.match(regex)) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public isTooShort(field: string, minLength: number = 4): boolean {
    const message: string = "Le champ doit faire au moins " + minLength + " caractères !";

    if (field.length < minLength) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public maxNb(field: Array<any>, maxNb: number): boolean {
    const message: string = "Vous ne pouvez prendre que 2 domaines d'activité au maximum";

    if (field.length > maxNb) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public minLength(field: string, nbChar: number): boolean {
    const message: string = 'Le champ doit faire au moins ' + nbChar + ' caractères';

    if (field.length < nbChar) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public maxLength(field: string, nbChar: number): boolean {
    const message: string = 'Le champ doit faire moins de ' + nbChar + ' caractères';

    if (field.length > nbChar) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public wrongLength(field: string, length: number = 10): boolean {
    const message: string = "Le champ doit faire " + length + " caractères !";

    if (field.length !== length) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  isWrongFormat(file: string, extensions: Array<string>) {
    let message: string = 'Tous les fichiers doivent être du ou des format(s) suivant(s) : ';

    for (const extension of extensions) {
      message += extension + ' ';
    }

    for (const extension of extensions) {
      if (file.endsWith(extension)) {
        return false;
      }
    }

    this.errorMessageManager.addErrorMessage(message);
    return true;
  }

  public isMailConform(field: string): boolean {
    const regex: RegExp = /^[a-z0-9-._]+@[a-z-]+\.[a-z]+$/;
    const message: string = "L'adresse n'est pas conforme";

    if (field.match(regex) === null) {
      this.errorMessageManager.addErrorMessage(message);
      return false;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return true;
  }

  public isNameNotConform(field: string): boolean {
    const regex: RegExp = /^[a-zA-Z-éèâ' ]+$/;
    const message: string = "Le nom n'est pas conforme";

    if (field.match(regex) === null) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  isCityConform(field: string): boolean {
    const regex: RegExp = /^[a-zA-Z-' ]+$/;
    const message: string = "Le nom n'est pas conforme";

    if (!field.match(regex)) {
      this.errorMessageManager.addErrorMessage(message);
      return false;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return true;
  }

  isStreetConform(field: string): boolean {
    const regex: RegExp = /^[1-9][0-9]{0,3}[ ](bis |ter )?(rue|avenue|av|boulevard|bd|villa|passage)[ ][a-zA-Z]+$/;
    const message: string = "L'adresse n'est pas conforme";

    if (!field.match(regex)) {
      this.errorMessageManager.addErrorMessage(message);
      return false;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return true;
  }

  public isPwdConfirmationDifferent(pwd: string, pwdConfirmation: string): boolean {
    const message: string = "Les mots de passe sont différents !";

    if (pwd !== pwdConfirmation) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }

  public maxWeight(weight: number, weightUnity: string, maxWeight: number) {
    const message: string = "Le poids du colis ne doit pas dépasser " + maxWeight + " kg";
    maxWeight = weightUnity === 'kg' ? maxWeight : maxWeight * 1000;

    if (weight > maxWeight) {
      this.errorMessageManager.addErrorMessage(message);
      return true;
    }
    this.errorMessageManager.removeErrorMessage(message);
    return false;
  }
}
