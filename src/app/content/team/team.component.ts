import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  members: TeamMember[] = []; 

  constructor() 
  {
    this.members.push(new TeamMember("Christophe Vincent","https://sites.google.com/site/souleaterfanclub1/_/rsrc/1472678602182/characters/death-the-kid/781px-Death2.jpg?height=224&width=400","https://media.melty.fr/article-3986372-ratio15_720-f5/media.jpg","CEO","Le bricoleur de l'équipe, chineur de bonnes affaires et collectionneur d'outils. Il a fait ses armes derrière les fourneaux avant de se reconvertir dans l'industrie de BTP en tant que responsable commercial au sein du groupe Soprema."));
    this.members.push(new TeamMember("Yannick Piault","https://fr.web.img6.acsta.net/newsv7/20/10/23/16/55/5813882.jpg","https://sites.google.com/site/souleaterfanclub1/_/rsrc/1472678602182/characters/death-the-kid/781px-Death2.jpg?height=224&width=400","CEO","J'ai regardé 24 fois les saisons de H, je porte une barbe noire et j'ai des cheveux longs pour éviter les aller-retour chez le coiffeur, selon moi le fromage est un mets constitué de lait frelaté et je voue presque un culte à la langue française. Sinon je fais du marketing et j'aime innover. Voilà."));
    this.members.push(new TeamMember("Samyr Rakoto","https://media.melty.fr/article-3986372-ratio15_720-f5/media.jpg","https://i.pinimg.com/originals/46/8b/b6/468bb647ff35656f17d661a4613e3697.png","CTO, Lead Dev Back","La légende dit qu'il ne dort pas et qu'il a inventé un formule chimique qui transforme ses heures de sommeils, sa passion pour la tech et le bien faire les choses en électricité pour faire tourner le serveur de prod. Si vous lisez ceci, c'est que sa formule fonctionne plutôt bien."));
    this.members.push(new TeamMember("Clément Gauthier","https://i.pinimg.com/originals/46/8b/b6/468bb647ff35656f17d661a4613e3697.png","https://fr.web.img6.acsta.net/newsv7/20/10/23/16/55/5813882.jpg","Lead Dev Front","Passionné de musculation, de création musicale, de rédaction et de macramé (un intrus s'est glissé dans la liste), je passe beaucoup trop de temps à me poser des questions auxquelles personne n'a jamais pensé et à faire des jeux de mots beaucoup trop honteux. Et parfois il m'arrive de coder aussi."));
   
   }

  ngOnInit(): void {
  } 
  
}
export class TeamMember{
  name: string;
  imgPath: string;
  imgPath2: string;
  status: string;
  description: string;

  constructor(name: string, imgPath:string, imgPath2: string, status:string, description: string)
  {
    this.name = name;
    this.imgPath = imgPath;
    this.imgPath2 = imgPath2;
    this.status = status;
    this.description = description;
  }
}
