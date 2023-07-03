import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from '../components/auth/Auth'
import {ArticlesPanel} from '../components/dashboard/ArticlesPanel'
import {Dashboard} from '../components/dashboard/Dashboard'
import {ProfilePanel} from '../components/dashboard/ProfilePanel'
import Home from '../components/home/Home'
import Header from '../components/navigation/Header'
import {AuthGuard} from '../hoc/AuthGuard'
import {AdminLayout} from '../layouts/AdminLayout'
import MainLayout from '../layouts/MainLayout'
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
							<Route path="/" element={<Home/>}/>
							<Route path="auth" element={<Auth/>}/>
							<Route path="dashboard"
									 element={<AuthGuard>
										 <AdminLayout>
											 <Dashboard/>
										 </AdminLayout>
									 </AuthGuard>}>
								<Route path="articles" element={<ArticlesPanel/>}/>
								<Route path="profile" element={<ProfilePanel/>}/>
							</Route>
						</Routes>
					</MainLayout>
				</>
			}
		</BrowserRouter>
	)
}

export default Router
