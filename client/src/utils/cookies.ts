import cookie from 'react-cookies'

export const getTokenCookie = (): string => {
	return cookie.load('x-access-token')
}

export const removeTokenCookie = (): void => {
	return cookie.remove('x-access-token', {path: '/'})
}

export const getAuthHeader = (): string => {
	return `Bearer ${getTokenCookie()}`
}