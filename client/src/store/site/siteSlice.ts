import {createSlice} from '@reduxjs/toolkit'


export const siteSlice = createSlice({
	name: 'site',
	initialState: {
		layout: '',
	},
	reducers: {
		handleLayout: (state, action) => {
			state.layout = action.payload
		},
	},
})

export const siteActions = siteSlice.actions