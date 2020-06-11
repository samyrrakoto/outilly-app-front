import { UserProfile } from './user-profile';

export class User {
    username: string;
    password: string;
    userProfile: UserProfile;

    constructor() {
        this.username = "";
        this.password = "";
        this.userProfile = new UserProfile();
    }
}
