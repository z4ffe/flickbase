import {createAsyncThunk} from '@reduxjs/toolkit'
import {LOCAL_API} from '../../lib/axios/instance'
import {getAuthHeader} from '../../utils/cookies'
import {errorGlobal, successGlobal} from '../reducers/notifications'

export const registerUser = createAsyncThunk('users/registerUser', async ({email, password}, {dispatch}) => {
	try {
		const response = await LOCAL_API.post('/auth/register', {
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
		const response = await LOCAL_API.post('/auth/signin', {
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

export const isAuth = createAsyncThunk('users/isAuth', async () => {
	try {
		const response = await LOCAL_API.get('/auth/isauth', {
			headers: {
				'Authorization': getAuthHeader()
			}
		})
		return {
			data: response.data,
			auth: true
		}
	} catch (error) {
		return {
			data: {},
			auth: false
		}
	}
})

