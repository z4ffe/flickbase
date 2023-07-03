import {configureStore} from '@reduxjs/toolkit';
import articlesSlice from './reducers/articles';
import notificationsSlice from './reducers/notifications';
import siteSlice from './reducers/site';
import usersSlice from './reducers/users';

export const store = configureStore({
	reducer: {
		users: usersSlice,
		articles: articlesSlice,
		notifications: notificationsSlice,
		site: siteSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch