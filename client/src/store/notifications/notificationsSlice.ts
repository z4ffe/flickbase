import {createSlice} from '@reduxjs/toolkit'

interface INotifications {
	global: {
		error: boolean
		msg: string
		success: boolean
	}
}

const NOTIFICATIONS_INITIAL_STATE: INotifications = {
	global: {
		error: false,
		msg: '',
		success: false,
	},
}

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState: NOTIFICATIONS_INITIAL_STATE,
	reducers: {
		errorGlobal: (state, action) => {
			state.global.error = true
			state.global.msg = action.payload
		},
		successGlobal: (state, action) => {
			state.global.success = true
			state.global.msg = action.payload
		},
		clearNotifications: () => NOTIFICATIONS_INITIAL_STATE,
	},
})

export const notificationsActions = notificationsSlice.actions