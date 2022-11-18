const express = require('express')
const router = express.Router()
const articlesController = require('../controllers/articles.controller')
const auth = require('../middleware/auth')
const {addArticleValidator} = require("../middleware/validation");

router.post('/', auth('createAny', 'articles'), addArticleValidator, articlesController.createArticle)
router.route('/article/:id')
   .get(auth('readAny', 'articles'), articlesController.getArticleById)


module.exports = router
