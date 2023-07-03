import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks.ts'
import {clearNotifications} from '../../store/reducers/notifications'
import {showToast} from '../../utils/tools.ts'
import SideNav from './SideNav.tsx'

const Header = () => {
	const notificationsReducer = useAppSelector(state => state.notifications)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const {global} = notificationsReducer
		// @ts-ignore
		if (notificationsReducer && global.error) {
			// const message = global.msg ? global.msg : 'Internal error' TODO: why not use?
			// @ts-ignore
			showToast('ERROR', notificationsReducer.global.msg)
			dispatch(clearNotifications())
		}
		// @ts-ignore
		if (notificationsReducer && global.success) {
			// @ts-ignore
			showToast('SUCCESS', notificationsReducer.global.msg)
			dispatch(clearNotifications())
		}
	}, [notificationsReducer])

	return (
		<nav className='navbar fixed-top'>
			<Link to='/' className='navbar-brand d-flex align-items-center fredoka_ff'>
				FlickVault
			</Link>
			<SideNav />
		</nav>
	)
}

export default Header
