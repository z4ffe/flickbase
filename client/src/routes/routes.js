import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from '../components/auth/Auth'
import {Dashboard} from '../components/dashboard/Dashboard'
import Home from '../components/home/Home'
import Header from '../components/navigation/Header'
import MainLayout from '../hoc/MainLayout'
import {isAuth} from '../store/thunks/users'
import {Loader} from '../utils/tools'

const Router = () => {
	const usersReducer = useSelector(state => state.users)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		dispatch(isAuth())
	}, [])

	useEffect(() => {
		if (usersReducer.auth !== null) {
			setLoading(false)
		}
	}, [usersReducer])

	return (
		<BrowserRouter>
			{loading ? <Loader/> :
				<>
					<Header/>
					<MainLayout>
						<Routes>
							<Route path="auth" element={<Auth/>}/>
							<Route path="/" element={<Home/>}/>
							<Route path="dashboard" element={<Dashboard/>}/>
						</Routes>
					</MainLayout>
				</>
			}
		</BrowserRouter>
	)
}

export default Router
