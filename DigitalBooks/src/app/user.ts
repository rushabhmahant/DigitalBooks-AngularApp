export class User {

    userId!: number;
	username!: string;
	userPassword!: string;
	userFirstName!: string;
	userLastName!: string;
    userRoles!: object[];
	
	enabled!: boolean;
	password!: string;
	authorities!: object[];
	accountNonExpired!: boolean;
	credentialsNonExpired!: boolean;
	accountNonLocked!: boolean


}
