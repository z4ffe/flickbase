import {IArticle} from './articles.ts'

export interface IPaginate {
	docs: IArticle[]
	totalDocs: number
	limit: number
	page: number | null
	totalPages: number | null
	pagingCounter: number
	hasPrevPage: boolean
	hasNextPage: boolean
	prevPage: number | null
	nextPage: number | null
}