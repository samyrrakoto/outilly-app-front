import { UserProfile } from './user-profile';

export class User {
    id: number;
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
