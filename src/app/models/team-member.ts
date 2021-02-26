export class TeamMember{
  name: string;
  imgPath: string;
  imgPath2: string;
  title: string;
  description: string;
  imgAlt: string;
  linkedin: string;

  constructor(name: string, imgPath:string, imgPath2: string, title:string, description: string, imgAlt: string, linkedin: string)
  {
    this.name = name;
    this.imgPath = imgPath;
    this.imgPath2 = imgPath2;
    this.title = title;
    this.description = description;
    this.imgAlt = imgAlt;
    this.linkedin = linkedin;
  }
}
