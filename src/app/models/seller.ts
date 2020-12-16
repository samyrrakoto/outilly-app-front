import { UserProfile } from './user-profile';

export class Seller {
    id: number;
    username: string;
    userProfile: UserProfile;
    nbOpenSales: number;

    constructor() {
      this.id = 0;
      this.username = "";
      this.userProfile = new UserProfile();
      this.nbOpenSales = 0;
    }
}
