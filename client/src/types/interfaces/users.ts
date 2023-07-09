export interface Users {
	_id: number
	email: string
	password: string
	role: 'admin' | 'user'
	verified: boolean
	date: string
	age?: number,
	firstname?: string
	lastname?: string
}

export interface IUserAuth {
	user: Users
	token: string
}