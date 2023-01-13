const express = require('express')
const app = express()
const mongoose = require('mongoose')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors');
const dotenv = require('dotenv').config()
const routes = require('./routes')
const {jwtStrategy} = require('./middleware/passport')
const {handleError, convertToApiError} = require('./middleware/apiError')
const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(DB)

// global middleware

app.use(bodyParser.json())
app.use(xss())
app.use(mongoSanitize())
app.use(passport.initialize())
app.use(cors())
passport.use('jwt', jwtStrategy)

// routes

app.use('/api', routes)

// error handling

app.use(convertToApiError)
app.use((err, req, res, next) => handleError(err, res))

// server exec

app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}`))

