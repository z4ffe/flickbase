import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('users/registerUser', async ({email, password}) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
			email: email,
			password: password
		})
		return {
			data: response.data.user,
			auth: true
		}
	} catch (error) {
		throw error
	}
})

export const signInUser = createAsyncThunk('users/signInUser', async ({email, password}, {dispatch}) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API}/auth/signin`, {
			email: email,
			password: password
		})
		return {
			data: response.data.user,
			auth: true
		}
	} catch (error) {
		throw error
	}
})
