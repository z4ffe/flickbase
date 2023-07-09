import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks.ts'
import {notificationsActions} from '../../store/notifications/notificationsSlice.ts'

import {showToast} from '../../utils/notifications.ts'
import SideNav from './SideNav.tsx'

const Header = () => {
	const notificationsReducer = useAppSelector(state => state.notifications)
	const layout = useAppSelector(state => state.site.layout)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const {global} = notificationsReducer
		if (notificationsReducer && global.error) {
			const message = global.msg ? global.msg : 'Internal error'
			showToast('ERROR', message)
			dispatch(notificationsActions.clearNotifications())
		}
		if (notificationsReducer && global.success) {
			showToast('SUCCESS', notificationsReducer.global.msg)
			dispatch(notificationsActions.clearNotifications())
		}
	}, [notificationsReducer])

	return (
		<nav className={`navbar fixed-top ${layout}`}>
			<Link to='/' className='navbar-brand d-flex align-items-center fredoka_ff'>
				CinemaVault
			</Link>
			<SideNav />
		</nav>
	)
}

export default Header
