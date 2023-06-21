const {User} = require('../models/user')
const httpStatus = require('http-status')
const userService = require('./user.service')
const {ApiError} = require('../middleware/apiError');

const createUser = async (email, password) => {
	try {
		if (await User.emailTaken(email)) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, email taken')
		}
		const user = new User({email, password})
		await user.save()
		return user
	} catch (error) {
		throw error
	}
}

const signInWithEmailAndPassword = async (email, password) => {
	try {
		const user = await userService.findUserByEmail(email)
		if (!user) {
			throw new Error('Sorry, bad email')
		}
		if (!(await user.comparePassword(password))) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, bad password')
		}
		return user
	} catch (error) {
		throw error
	}
}


const genAuthToken = (user) => {
	const token = user.generateAuthToken();
	return token;
}

module.exports = {createUser, genAuthToken, signInWithEmailAndPassword}
