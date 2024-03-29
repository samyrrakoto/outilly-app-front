import { Component, OnInit } from '@angular/core';
import { TeamMember } from 'src/app/models/team-member';
import { MetaDataService } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  members: TeamMember[] = [];
  displaySecondPhoto: [boolean, boolean, boolean, boolean];

  constructor(private meta: MetaDataService) {
    this.members.push(
      new TeamMember(
        "Christophe Vincent",
        "christophe-vincent-cso-cofondateur-outilly-1.jpg",
        "christophe-vincent-cso-cofondateur-outilly-2.jpg",
        "Chief Sales Officer",
        "Le bricolo de l'équipe, mais surtout chineur de bonnes affaires et collectionneur d'outils ! J'ai fait mes armes derrière les fourneaux avant de me reconvertir dans l'industrie de BTP en tant que responsable commercial au sein du groupe Soprema.",
        "Christophe Vincent CSO et cofondateur d'Outilly",
        "christophe-vincent-7bb851173"
        ));
    this.members.push(
      new TeamMember(
        "Yannick Piault",
        "yannick-piault-ceo-cofondateur-outilly-2.jpg",
        "yannick-piault-ceo-cofondateur-outilly-1.jpg",
        "Chief Executive Officer",
        "J'ai regardé 24 fois les saisons de H, je porte une barbe noire et j'ai des cheveux longs pour éviter les aller-retour chez le coiffeur, selon moi le fromage est un mets constitué de lait frelaté et je voue presque un culte à la langue française. Sinon je fais du marketing et j'aime innover. Voilà.",
        "Yannick Piault CEO et cofondateur d'Outilly",
        "yannick-piault"
        ));
    this.members.push(
      new TeamMember(
        "Samyr Rakoto",
        "samyr-rakoto-cto-cofondateur-outilly-2.jpg",
        "samyr-rakoto-cto-cofondateur-outilly-1.jpg",
        "Chief Technical Officer",
        "La légende raconte que je ne dors pas et que j'aurais inventé une formule chimique qui transforme mes heures de sommeil, ma passion pour la tech et le \"bien faire les choses\" en électricité pour faire tourner le serveur de production. Si vous lisez ceci, c'est que la formule fonctionne plutôt bien.",
        "Samyr Rakoto CTO et cofondateur d'Outilly",
        "samyr-rakoto"
        ));
    this.members.push(
      new TeamMember(
        "Clément Gauthier",
        "clement-gauthier-lead-front-dev-cofondateur-outilly-1.jpg",
        "clement-gauthier-lead-front-dev-cofondateur-outilly-2.jpg",
        "Lead Front Dev",
        "Passionné de musculation, de création musicale, de rédaction et de macramé (un intrus s'est glissé dans la liste), je passe beaucoup trop de temps à me poser des questions auxquelles personne n'a jamais pensé et à faire des jeux de mots beaucoup trop honteux. Et parfois il m'arrive de coder aussi.",
        "Clément Gauthier Lead Front Dev et cofondateur d'Outilly",
        "clément-gauthier-483239101"
      ));
    this.displaySecondPhoto = [false, false, false, false];
   }

  ngOnInit(): void {
    this.meta.updateTags(
      "L'équipe",
      "Découvrez qui sont les personnes derrière Outilly !",
      "team",
      "team/outilly-is-us.jpg"
    );
  }
}
