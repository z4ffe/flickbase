const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
require('dotenv').config()

const articleSchema = mongoose.Schema({
   title: {
	  type: String,
	  maxlength: 100,
	  required: [true, 'You need a title']
   },
   content: {
	  type: String,
	  required: [true, 'You need some content']

   },
   excerpt: {
	  type: String,
	  required: [true, 'You need some excerpt'],
	  maxlength: 500
   },
   score: {
	  type: Number,
	  min: 0,
	  max: 100,
	  required: true
   },
   director: {
	  type: String,
	  required: true,
   },
   actors: {
	  type: [String],
	  required: true,
	  validate: {
		 validator: function (array) {
			return array.length >= 2
		 }, message: 'You must at least 3 actors'
	  }
   },
   status: {
	  type: String,
	  required: true,
	  enum: ['draft', 'public'],
	  default: 'draft',
	  index: true
   },
   date: {
	  type: Date,
	  default: Date.now
   }
})

articleSchema.plugin(aggregatePaginate)

const Article = mongoose.model('Article', articleSchema);
module.exports = {Article}

