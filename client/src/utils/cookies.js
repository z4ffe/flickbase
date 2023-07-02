import cookie from 'react-cookies'

export const getTokenCookie = () => {
	return cookie.load('x-access-token')
}

export const removeTokenCookie = () => {
	return cookie.remove('x-access-token', {path: '/'})
}

export const getAuthHeader = () => {
	return {
		headers: {
			'Authorization': `Bearer: ${getTokenCookie()}`
		}
	}
}