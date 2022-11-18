const {check, validationResult} = require('express-validator')
const httpStatus = require('http-status')

const addArticleValidator = [
   check('title')
	  .trim().not().isEmpty().withMessage('You need to add a title').bail()
	  .isLength({min: 3}).withMessage('Minimum 3 required').bail(),
   check('director')
	  .trim().not().isEmpty().withMessage('You need to add a director').bail()
	  .not().isBoolean().withMessage('You cannot add boolean here')
	  .isLength({min: 3, max: 100}).withMessage('Minimum 3 chars and maximus is 100 chars').bail(),
   (req, res, next) => {
	  const error = validationResult(req)
	  if (!error.isEmpty()) {
		 return res.status(httpStatus.BAD_REQUEST).json({
			error: error.array()
		 })
	  }
	  next()
   }
]

module.exports = {addArticleValidator}
