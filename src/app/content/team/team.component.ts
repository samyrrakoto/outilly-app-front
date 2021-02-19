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
    this.members.push(new TeamMember("Christophe Vincent","https://sites.google.com/site/souleaterfanclub1/_/rsrc/1472678602182/characters/death-the-kid/781px-Death2.jpg?height=224&width=400","https://media.melty.fr/article-3986372-ratio15_720-f5/media.jpg","CEO","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"));
    this.members.push(new TeamMember("Yannick Piault","https://fr.web.img6.acsta.net/newsv7/20/10/23/16/55/5813882.jpg","https://sites.google.com/site/souleaterfanclub1/_/rsrc/1472678602182/characters/death-the-kid/781px-Death2.jpg?height=224&width=400","CEO","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"));
    this.members.push(new TeamMember("Samyr Rakoto","https://media.melty.fr/article-3986372-ratio15_720-f5/media.jpg","https://i.pinimg.com/originals/46/8b/b6/468bb647ff35656f17d661a4613e3697.png","CTO, Lead Dev Back","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"));
    this.members.push(new TeamMember("Clément Gauthier","https://i.pinimg.com/originals/46/8b/b6/468bb647ff35656f17d661a4613e3697.png","https://fr.web.img6.acsta.net/newsv7/20/10/23/16/55/5813882.jpg","Lead Dev Front","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"));
   
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
