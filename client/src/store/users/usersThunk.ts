import {createAsyncThunk} from '@reduxjs/toolkit'
import {AxiosResponse} from 'axios'
import {LOCAL_API} from '../../lib/axios/instance.ts'
import {IUserAuth, Users} from '../../types/interfaces/users.ts'
import {getAuthHeader} from '../../utils/cookies.ts'
import {notificationsActions} from '../notifications/notificationsSlice.ts'


export const registerUser = createAsyncThunk('users/registerUser', async ({email, password}: any, {dispatch}) => {
	try {
		const response: AxiosResponse<IUserAuth> = await LOCAL_API.post('/auth/register', {
			email: email,
			password: password,
		})
		dispatch(notificationsActions.successGlobal('You registered successfully. Check your email for verification message.'))
		return {
			data: response.data.user,
			auth: true,
		}
	} catch (error) {
		// @ts-ignore
		dispatch(notificationsActions.errorGlobal(error.response.data.message))
		throw error
	}
})

export const signInUser = createAsyncThunk('users/signInUser', async ({email, password}: any, {dispatch}) => {
	try {
		const response: AxiosResponse<IUserAuth> = await LOCAL_API.post('/auth/signin', {
			email: email,
			password: password,
		})
		dispatch(notificationsActions.successGlobal('You successfully logged in'))
		return {
			data: response.data.user,
			auth: true,
		}
	} catch (error) {
		// @ts-ignore
		dispatch(notificationsActions.errorGlobal(error.response.data.message))
		throw error
	}
})

export const isAuth = createAsyncThunk('users/isAuth', async () => {
	try {
		const response: AxiosResponse<Pick<Users, '_id' | 'email' | 'role' | 'verified'>> = await LOCAL_API.get('/auth/isauth', {
			headers: {
				'Authorization': getAuthHeader(),
			},
		})
		return {
			data: response.data,
			auth: true,
		}
	} catch (error) {
		return {
			data: {},
			auth: false,
		}
	}
})

