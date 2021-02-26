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

  constructor(private meta: MetaDataService)
  {
    this.members.push(
      new TeamMember(
        "Christophe Vincent",
        "https://media.outilly.com/team/christophe-vincent-cso-cofondateur-outilly-1.jpg",
        "https://media.outilly.com/team/christophe-vincent-cso-cofondateur-outilly-2.jpg",
        "Chief Sales Officer (CSO)",
        "Le bricoleur de l'équipe, chineur de bonnes affaires et collectionneur d'outils. Il a fait ses armes derrière les fourneaux avant de se reconvertir dans l'industrie de BTP en tant que responsable commercial au sein du groupe Soprema.",
        "Christophe Vincent CSO et cofondateur d'Outilly",
        "christophe-vincent-7bb851173"
        ));
    this.members.push(
      new TeamMember(
        "Yannick Piault",
        "https://media.outilly.com/team/yannick-piault-ceo-cofondateur-outilly-2.jpg",
        "https://media.outilly.com/team/yannick-piault-ceo-cofondateur-outilly-1.jpg",
        "Chief Executive Officer (CEO)",
        "J'ai regardé 24 fois les saisons de H, je porte une barbe noire et j'ai des cheveux longs pour éviter les aller-retour chez le coiffeur, selon moi le fromage est un mets constitué de lait frelaté et je voue presque un culte à la langue française. Sinon je fais du marketing et j'aime innover. Voilà.",
        "Yannick Piault CEO et cofondateur d'Outilly",
        "yannick-piault"
        ));
    this.members.push(
      new TeamMember(
        "Samyr Rakoto",
        "https://media.outilly.com/team/samyr-rakoto-cto-cofondateur-outilly-2.jpg",
        "https://media.outilly.com/team/samyr-rakoto-cto-cofondateur-outilly-1.jpg",
        "Chief Technical Officer (CTO)",
        "La légende dit qu'il ne dort pas et qu'il a inventé une formule chimique qui transforme ses heures de sommeil, sa passion pour la tech et le \"bien faire les choses\" en électricité pour faire tourner le serveur de prod. Si vous lisez ceci, c'est que sa formule fonctionne plutôt bien.",
        "Samyr Rakoto CTO et cofondateur d'Outilly",
        "samyr-rakoto"
        ));
    this.members.push(
      new TeamMember(
        "Clément Gauthier",
        "https://media.outilly.com/team/clement-gauthier-lead-front-dev-cofondateur-outilly-1.jpg",
        "https://media.outilly.com/team/clement-gauthier-lead-front-dev-cofondateur-outilly-2.jpg",
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
