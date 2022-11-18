const express = require('express')
const router = express.Router()

const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const articlesRoute = require('./articles.route')

const routesIndex = [
   {
	  path: "/auth",
	  route: authRoute
   },
   {
	  path: "/user",
	  route: userRoute
   },
   {
	  path: "/articles",
	  route: articlesRoute
   }
]

routesIndex.forEach((route) => {
   router.use(route.path, route.route)
})

module.exports = router
