import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  public display(message: string, domId: string, classes: string[] = [], duration: number = 5000): void {
    const content: HTMLElement = document.getElementById(domId);
    const notif: HTMLDivElement = document.createElement('div');

    notif.id = 'notification';
    notif.innerHTML = message;
    content.appendChild(notif);
    this.addClasses(notif, classes);

    if (duration !== -1) {
      setTimeout(() => notif.remove() , duration);
    }
  }

  private addClasses(elem: HTMLDivElement, HtmlClasses: string[]): void {
    for (const HtmlClass of HtmlClasses) {
      elem.classList.add(HtmlClass);
    }
  }
}
