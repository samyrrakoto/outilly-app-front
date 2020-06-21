import { UserProfile } from './user-profile';

export class User {
    username: string;
    password: string;
    passwordConfirmation: string;
    userProfile: UserProfile;

    constructor() {
        this.username = "";
        this.password = "";
        this.passwordConfirmation = "";
        this.userProfile = new UserProfile();
    }
}
