export class User {

    userId!: number;
	username!: string;
	userPassword!: string;
	userFirstName!: string;
	userLastName!: string;
    userRoles!: Role[];
	
	enabled!: boolean;
	password!: string;
	authorities!: object[];
	accountNonExpired!: boolean;
	credentialsNonExpired!: boolean;
	accountNonLocked!: boolean


}

export class Role {
	roleId!: number;
	roleName!: string; 
}
