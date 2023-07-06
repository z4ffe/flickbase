import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {AdminLayout} from '../layouts/AdminLayout.tsx'
import {useAppDispatch} from '../lib/redux/hooks.ts'
import {siteActions} from '../store/site/siteSlice.ts'

export const Dashboard = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(siteActions.handleLayout('dash_layout'))
		return () => {
			dispatch(siteActions.handleLayout(''))
		}
	}, [])

	return (
		<AdminLayout>
			<Outlet />
		</AdminLayout>
	)
}