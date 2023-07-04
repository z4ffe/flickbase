import {configureStore} from '@reduxjs/toolkit'
import {articlesSlice} from './articles/articlesSlice.ts'
import {notificationsSlice} from './notifications/notificationsSlice.ts'
import {siteSlice} from './site/siteSlice.ts'
import {usersSlice} from './users/usersSlice.ts'

export const store = configureStore({
	reducer: {
		users: usersSlice.reducer,
		articles: articlesSlice.reducer,
		notifications: notificationsSlice.reducer,
		site: siteSlice.reducer,
	},
})


export const usersActions = usersSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch