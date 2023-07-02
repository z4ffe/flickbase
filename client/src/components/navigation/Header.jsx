import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {clearNotifications} from '../../store/reducers/notifications'
import {showToast} from '../../utils/tools'
import SideNav from './SideNav'

const Header = () => {
	const notificationsReducer = useSelector(state => state.notifications)
	const dispatch = useDispatch()

	useEffect(() => {
		const {global} = notificationsReducer
		if (notificationsReducer && global.error) {
			const message = global.msg ? global.msg : 'Internal error'
			showToast('ERROR', notificationsReducer.global.msg)
			dispatch(clearNotifications())
		}
		if (notificationsReducer && global.success) {
			showToast('SUCCESS', notificationsReducer.global.msg)
			dispatch(clearNotifications())
		}
	}, [notificationsReducer])

	return (
		<nav className="navbar fixed-top">
			<Link to="/" className="navbar-brand d-flex align-items-center fredoka_ff">
				FlickVault
			</Link>
			<SideNav/>
		</nav>
	)
}

export default Header
