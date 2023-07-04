import {createSlice} from '@reduxjs/toolkit'
import {isAuth, registerUser, signInUser} from './usersThunk.ts'

interface IUsersSlice {
	loading: boolean
	data: {
		_id: null | number,
		email: null | string,
		firstname: null | string,
		lastname: null | string,
		age: null | string,
		verified: null | string,
	},
	auth: null | boolean,
}

const DEFAULT_USER_STATE: IUsersSlice = {
	loading: false,
	data: {
		_id: null,
		email: null,
		firstname: null,
		lastname: null,
		age: null,
		verified: null,
	},
	auth: null,
}

export const usersSlice = createSlice({
	name: 'users',
	initialState: DEFAULT_USER_STATE,
	reducers: {
		signOut: (state) => {
			state.data = DEFAULT_USER_STATE.data
			state.loading = false
			state.auth = false
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false
			state.data = action.payload.data
			state.auth = action.payload.auth
		})
		builder.addCase(registerUser.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(signInUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(signInUser.fulfilled, (state, action) => {
			state.loading = false
			state.data = action.payload.data
			state.auth = action.payload.auth
		})
		builder.addCase(signInUser.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(isAuth.pending, (state) => {
			state.loading = true
		})
		builder.addCase(isAuth.fulfilled, (state, action) => {
			state.loading = false
			state.data = {
				...state.data,
				...action.payload.data,
			}
			state.auth = action.payload.auth
		})
		builder.addCase(isAuth.rejected, (state) => {
			state.loading = false
		})
	},
})
