import {createSlice} from '@reduxjs/toolkit'
import {IArticle} from '../../types/interfaces/articles.ts'
import {IPaginate} from '../../types/interfaces/paginate.ts'
import {addArticle, getPaginatedArticles, updateArticleStatusById} from './articlesThunk.ts'

interface IArticlesSlice {
	homeSort: {}
	loading: boolean
	articles: IArticle[]
	current: null
	lastAdded: IArticle | null
	dashboardArticles: IPaginate | null
}

const ARTICLES_INITIAL_STATE: IArticlesSlice = {
	homeSort: {},
	loading: false,
	articles: [],
	current: null,
	lastAdded: null,
	dashboardArticles: null,
}

export const articlesSlice = createSlice({
	name: 'articles',
	initialState: ARTICLES_INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addArticle.pending, (state) => {
			state.loading = true
		})
		builder.addCase(addArticle.fulfilled, (state, action) => {
			state.loading = false
			state.lastAdded = action.payload
		})
		builder.addCase(addArticle.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(getPaginatedArticles.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getPaginatedArticles.fulfilled, (state, action) => {
			state.loading = false
			state.dashboardArticles = action.payload
		})
		builder.addCase(getPaginatedArticles.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(updateArticleStatusById.fulfilled, (state, action) => {
			if (state.dashboardArticles) {
				const index = state.dashboardArticles.docs.findIndex(article => article._id === action.payload._id)
				const newState = [...state.dashboardArticles.docs]
				newState[index] = action.payload
				return {...state, dashboardArticles: {...state.dashboardArticles, docs: newState}}
			}
		})
	},
})
