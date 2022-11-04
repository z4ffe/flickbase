const express = require('express')
const mongoose = require('mongoose')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const app = express()
const routes = require('./routes')
const {handleError, convertToApiError} = require('./middleware/apiError')
const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(DB)

// global middleware

app.use(bodyParser.json())
app.use(xss())
app.use(mongoSanitize())

// routes

app.use('/api', routes)

//

app.use(convertToApiError)
app.use((err, req, res, next) => {handleError(err, res)})

//

app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}`))

