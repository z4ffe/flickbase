import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const LOCAL_API = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	withCredentials: true,
})