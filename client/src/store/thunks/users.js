import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {errorGlobal, successGlobal} from '../reducers/notifications';

export const registerUser = createAsyncThunk('users/registerUser', async ({email, password}, {dispatch}) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
			email: email,
			password: password
		})
		dispatch(successGlobal('You registered successfully. Check your email for verification message.'))
		return {
			data: response.data.user,
			auth: true
		}
	} catch (error) {
		dispatch(errorGlobal(error.response.data.message))
		throw error
	}
})

export const signInUser = createAsyncThunk('users/signInUser', async ({email, password}, {dispatch}) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API}/auth/signin`, {
			email: email,
			password: password
		})
		dispatch(successGlobal('You successfully logged in'))
		return {
			data: response.data.user,
			auth: true
		}
	} catch (error) {
		dispatch(errorGlobal(error.response.data.message))
		throw error
	}
})
