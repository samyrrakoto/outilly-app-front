import { environment } from 'src/environments/environment';

export class TeamMember {
  name: string;
  imgPath: string;
  imgPath2: string;
  title: string;
  description: string;
  imgAlt: string;
  linkedin: string;

  constructor(name: string, imgPath:string, imgPath2: string, title:string, description: string, imgAlt: string, linkedin: string) {
    this.name = name;
    this.imgPath = this.getImgPath(imgPath);
    this.imgPath2 = this.getImgPath(imgPath2);
    this.title = title;
    this.description = description;
    this.imgAlt = imgAlt;
    this.linkedin = linkedin;
  }

  private getImgPath(imgName: string): string {
    return environment.mediaBaseUri + 'team/' + imgName;
  }
}
