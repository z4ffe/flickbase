import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearNotifications} from '../../store/reducers/notifications';
import SideNav from './SideNav';

const Header = () => {
	const notificationsStore = useSelector(state => state.notifications)
	const dispatch = useDispatch()

	useEffect(() => {
		const {global} = notificationsStore
		if (notificationsStore && global.error) {
			console.log('error')
			dispatch(clearNotifications())
		}
		if (notificationsStore && global.success) {
			console.log('success')
			dispatch(clearNotifications())
		}
	}, [notificationsStore])

	return (
		<nav className="navbar fixed-top">
			<Link to="/" className="navbar-brand d-flex align-items-center fredoka_ff">
				FlickVault
			</Link>
			<SideNav/>
		</nav>
	);
};

export default Header;
