export interface CreateUser {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	password2: string;
}

export interface LoginUser {
	email: string;
	password: string;
}
