import {createAsyncThunk} from '@reduxjs/toolkit'
import {AxiosResponse} from 'axios'
import {FormikValues} from 'formik'
import {LOCAL_API} from '../../lib/axios/instance.ts'
import {articlesValues} from '../../schemas/articlesForm.tsx'
import {IArticle} from '../../types/interfaces/articles.ts'
import {IPaginate} from '../../types/interfaces/paginate.ts'
import {getAuthHeader} from '../../utils/cookies.ts'
import {notificationsActions} from '../notifications/notificationsSlice.ts'
import {RootState} from '../store.ts'

export const addArticle = createAsyncThunk('articles/addArticle', async (article: articlesValues, {dispatch}) => {
	try {
		const response: AxiosResponse<IArticle> = await LOCAL_API.post('/articles', article, {
			headers: {
				'Authorization': getAuthHeader(),
			},
		})
		dispatch(notificationsActions.successGlobal(`Article "${response.data.title}" created`))
		return response.data
	} catch (error) {
		dispatch(notificationsActions.errorGlobal('Something went wrong'))
		throw error
	}
})

export const getAdminArticle = createAsyncThunk('articles/getAdminArticle', async (id: string) => {
	try {
		const response = await LOCAL_API.get(`/articles/article/${id}`, {
			headers: {
				'Authorization': getAuthHeader(),
			},
		})
		return response.data
	} catch (error) {
		throw error
	}
})

export const updateArticleById = createAsyncThunk('articles/updateArticleById', async ({values, id}: {
	values: FormikValues,
	id: string
}, {dispatch}) => {
	try {
		const response = await LOCAL_API.patch(`/articles/article/${id}`, values,
			{
				headers: {
					'Authorization': getAuthHeader(),
				},
			})
		dispatch(notificationsActions.successGlobal(`Article "${response.data.title}" was updated`))
		return response.data
	} catch (error) {
		dispatch(notificationsActions.errorGlobal('Something went wrong'))
		throw error
	}
})

export const getPaginatedArticles = createAsyncThunk('articles/getPaginatedArticles', async ({
																																page = 1, limit = 5,
																																keywords = '',
																															}: {
	page?: number | null,
	limit?: number,
	keywords?: string
}) => {
	try {
		const response: AxiosResponse<IPaginate> = await LOCAL_API.post('articles/admin/paginate',
			{page, limit, keywords},
			{
				headers: {
					'Authorization': getAuthHeader(),
				},
			})
		return response.data
	} catch (error) {
		throw error
	}
})

export const updateArticleStatusById = createAsyncThunk('articles/updateArticleStatusById', async ({id, status}: {
	id: string,
	status: 'public' | 'draft'
}, {dispatch}) => {
	try {
		const response: AxiosResponse<IArticle> = await LOCAL_API.patch(`/articles/article/${id}`,
			{
				status,
			},
			{
				headers: {
					'Authorization': getAuthHeader(),
				},
			})
		dispatch(notificationsActions.successGlobal(`Status updated for "${response.data.title}"`))
		return response.data
	} catch (error) {
		dispatch(notificationsActions.errorGlobal('Something went wrong'))
		throw error
	}
})

export const deleteArticleById = createAsyncThunk('articles/deleteArticleById', async (id: string, {
	dispatch, getState,
}) => {
	try {
		const state = getState() as RootState
		const page = state.articles.dashboardArticles!.page
		const response: AxiosResponse<IArticle> = await LOCAL_API.delete(`/articles/article/${id}`,
			{
				headers: {
					'Authorization': getAuthHeader(),
				},
			})
		await dispatch(getPaginatedArticles({page}))
		dispatch(notificationsActions.errorGlobal(`Article was deleted`))
		return response.data
	} catch (error) {
		dispatch(notificationsActions.errorGlobal('Something went wrong'))
		throw error
	}
})
