import {createAsyncThunk} from '@reduxjs/toolkit'
import {AxiosResponse} from 'axios'
import {LOCAL_API} from '../../lib/axios/instance.ts'
import {articlesValues} from '../../schemas/articlesForm.tsx'
import {IArticles} from '../../types/interfaces/articles.ts'
import {getAuthHeader} from '../../utils/cookies.ts'
import {notificationsActions} from '../notifications/notificationsSlice.ts'

export const addArticle = createAsyncThunk('articles/addArticle', async (article: articlesValues, {dispatch}) => {
	try {
		const response: AxiosResponse<IArticles> = await LOCAL_API.post('/articles', article, {
			headers: {
				'Authorization': getAuthHeader(),
			},
		})
		dispatch(notificationsActions.successGlobal('Post created'))
		return response.data
	} catch (error) {
		dispatch(notificationsActions.errorGlobal('Something went wrong'))
		throw error
	}
})