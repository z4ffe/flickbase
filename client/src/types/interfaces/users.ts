export interface Users {
	_id: number
	email: string
	password: string
	role: 'admin' | 'user'
	verified: boolean
	date: string
}

export interface IUserAuth {
	user: Users
	token: string
}