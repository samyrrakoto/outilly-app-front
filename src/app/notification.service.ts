import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public display(message: string, domId: string, duration: number = 5000): void {
    const content: HTMLElement = document.getElementById(domId);
    const notif: HTMLDivElement = document.createElement('div');

    notif.classList.add('notification', 'is-success', 'is-small');
    notif.id = 'notification';
    notif.style.marginTop = '20px';
    notif.innerHTML = message;
    content.appendChild(notif);

    setTimeout(() => { notif.remove(); }, duration);
  }
}
