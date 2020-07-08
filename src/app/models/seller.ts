import { UserProfile } from './user-profile';

export class Seller {
    id: number;
    username: string;
    userProfile: UserProfile;

    constructor() {
        this.id = 0;
        this.username = "";
        this.userProfile = new UserProfile();
    }
}
