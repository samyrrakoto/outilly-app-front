import { UserProfile } from './user-profile';
export class Bidder {
  id: number;
  userProfile: UserProfile;
  username: string;

  constructor() {
    this.id = 0;
    this.userProfile = new UserProfile();
    this.username = '';
  }
}
