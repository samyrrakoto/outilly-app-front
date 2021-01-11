import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getSlug(subject: string): string {
    switch(subject) {
      case 'Obtenir des informations complémentaires pour une annonce':
        return 'more-infos-on-listing';
      case 'J\'ai une question à propos de ma commande (SAV)':
        return 'question-about-order';
      case 'Je rencontre un problème technique sur le site':
        return 'technical issue';
      case 'Je suis professionnel(le) et souhaite être accompagné(e)':
        return 'pro-partnership';
      case 'Je souhaite contacter les équipes marketing':
        return 'marketing-contact-request';
      case 'Je souhaite modifier mes informations personnelles':
        return 'infos-update-request';
      case 'Je souhaite modifier mes coordonnées bancaires':
        return 'bank-infos-update-request';
      case 'Autre':
        return 'other';
    }
  }
}
