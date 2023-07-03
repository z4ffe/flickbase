import axios from 'axios'

export const LOCAL_API = axios.create({
	baseURL: 'http://localhost:5005/api',
	timeout: 10000,
	withCredentials: true
})