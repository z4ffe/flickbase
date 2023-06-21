import {createSlice} from '@reduxjs/toolkit';
import {registerUser, signInUser} from '../thunks/users';

const DEFAULT_USER_STATE = {
	loading: false,
	data: {
		_id: null,
		email: null,
		firstname: null,
		lastname: null,
		age: null,
		verified: null
	},
	auth: null
}

export const usersSlice = createSlice({
	name: 'users',
	initialState: DEFAULT_USER_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false
			state.data = action.payload.data
			state.auth = action.payload.auth
		})
		builder.addCase(registerUser.rejected, (state, action) => {
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
		builder.addCase(signInUser.rejected, (state, action) => {
			state.loading = false
		})
	}
})

export default usersSlice.reducer
