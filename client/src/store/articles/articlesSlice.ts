import {createSlice} from '@reduxjs/toolkit'
import {IArticles} from '../../types/interfaces/articles.ts'
import {addArticle} from './articlesThunk.ts'

interface IArticlesSlice {
	homeSort: {}
	loading: boolean
	articles: IArticles[]
	current: null
	lastAdded: IArticles | null
}

const ARTICLES_INITIAL_STATE: IArticlesSlice = {
	homeSort: {},
	loading: false,
	articles: [],
	current: null,
	lastAdded: null,
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
	},
})
