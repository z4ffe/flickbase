import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./reducers/users";
import articlesSlice from "./reducers/articles";
import notificationsSlice from "./reducers/notifications";
import siteSlice from "./reducers/site";

export const store = configureStore({
   reducer: {
	  users: usersSlice,
	  articles: articlesSlice,
	  notifications: notificationsSlice,
	  site: siteSlice
   }
})
