import { MangoPayData } from './mango-pay-data';
import { UserProfile } from './user-profile';

export class User {
    id: number;
    username: string;
    password: string;
    newPassword: string;
    passwordConfirmation: string;
    userProfile: UserProfile;
    status: string;
    mangoPayData: MangoPayData;
    isCompleted: boolean;

    constructor() {
      this.id = 0;
      this.username = '';
      this.password = '';
      this.newPassword = '';
      this.passwordConfirmation = '';
      this.userProfile = new UserProfile();
      this.status = 'toActivate';
      this.mangoPayData = new MangoPayData();
      this.isCompleted = false;
    }
}
