const httpStatus = require('http-status')
const {articlesService} = require('../services')

const articlesController = {
   async getAllArticles(req, res, next) {
	  try {
		 const articles = await articlesService.getAllArticles(req)
		 res.status(httpStatus.OK).json(articles)
	  } catch (error) {
		 next(error)
	  }
   },
   async getMoreArticles(req, res, next) {
	  try {
		 const articles = await articlesService.getMoreArticles(req)
		 res.status(httpStatus.OK).json(articles)
	  } catch (error) {
		 next(error)
	  }
   },
   async createArticle(req, res, next) {
	  try {
		 const article = await articlesService.addArticle(req.body)
		 res.json(article)
	  } catch (error) {
		 next(error)
	  }
   },
   async getArticleById(req, res, next) {
	  try {
		 const _id = req.params.id;
		 const article = await articlesService.getArticleById(_id, req.user)
		 res.json(article)
	  } catch (error) {
		 next(error)
	  }
   },
   async getUsersArticleById(req, res, next) {
	  try {
		 const _id = req.params.id;
		 const article = await articlesService.getUsersArticleById(_id, req.user)
		 res.json(article)
	  } catch (error) {
		 next(error)
	  }
   },
   async updateArticleById(req, res, next) {
	  try {
		 const _id = req.params.id
		 const article = await articlesService.updateArticleById(_id, req.body)
		 res.json(article)
	  } catch (error) {
		 next(error)
	  }
   },
   async deleteArticleById(req, res, next) {
	  try {
		 const _id = req.params.id
		 const article = await articlesService.deleteArticleById(_id)
		 res.status(httpStatus.OK).json({action: 'Deleted', articleBody: article})
	  } catch (error) {
		 next(error)
	  }
   },
   async adminPaginate(req, res, next) {
	  try {
		 const articles = await articlesService.paginateAdminArticles(req)
		 res.json(articles)
	  } catch (error) {
		 next(error)
	  }
   }
}

module.exports = articlesController
