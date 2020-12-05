import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public display(message: string, domId: string, notifType: string = 'notif', duration: number = 5000): void {
    const content: HTMLElement = document.getElementById(domId);
    const notif: HTMLDivElement = document.createElement('div');
    let notifStyle: string = '';

    switch(notifType) {
      case 'notif':
        notifStyle = 'is-success';
        break;
      case 'error':
        notifStyle = 'is-danger';
        break;
    }

    notif.classList.add('notification', notifStyle, 'is-small');
    notif.id = 'notification';
    notif.style.color = 'white';
    notif.style.marginTop = '20px';
    notif.innerHTML = message;
    content.appendChild(notif);

    setTimeout(() => notif.remove() , duration);
  }
}
