import {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from '../components/auth/Auth.tsx'
import {ArticlesPanel} from '../components/dashboard/ArticlesPanel.tsx'
import {Dashboard} from '../components/dashboard/Dashboard.tsx'
import {ProfilePanel} from '../components/dashboard/ProfilePanel.tsx'
import {Home} from '../components/home/Home.tsx'
import Header from '../components/navigation/Header.tsx'
import {AuthGuard} from '../guards/AuthGuard.tsx'
import {AdminLayout} from '../layouts/AdminLayout.tsx'
import MainLayout from '../layouts/MainLayout.tsx'
import {useAppDispatch, useAppSelector} from '../lib/redux/hooks.ts'
import {Loader} from '../shared/Loader.tsx'
import {isAuth} from '../store/users/usersThunk.ts'

const Router = () => {
	const usersReducer = useAppSelector((state: any) => state.users)
	const dispatch = useAppDispatch()
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
			{loading ? <Loader /> :
				<>
					<Header />
					<MainLayout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='auth' element={<Auth />} />
							<Route path='dashboard'
									 element={<AuthGuard>
										 <AdminLayout>
											 <Dashboard />
										 </AdminLayout>
									 </AuthGuard>}>
								<Route path='articles' element={<ArticlesPanel />} />
								<Route path='profile' element={<ProfilePanel />} />
							</Route>
						</Routes>
					</MainLayout>
				</>
			}
		</BrowserRouter>
	)
}

export default Router
