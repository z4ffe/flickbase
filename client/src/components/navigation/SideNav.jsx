import DashboardIcon from '@mui/icons-material/Dashboard'

import DehazeIcon from '@mui/icons-material/Dehaze'
import HomeIcon from '@mui/icons-material/Home'
import MailIcon from '@mui/icons-material/Mail'
import VpnKeyIcon from '@mui/icons-material/VpnKey'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {signOut} from '../../store/reducers/users'
import {removeTokenCookie} from '../../utils/cookies'
import {showToast} from '../../utils/tools'

const SideNav = () => {
	const usersReducer = useSelector(state => state.users)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()

	const handleSignOut = () => {
		dispatch(signOut())
		removeTokenCookie()
		navigate('/')
		setOpen(false)
		showToast('WARN', 'You are successfully signed out')
	}

	return (
		<>
			<DehazeIcon className="drawer_btn" onClick={() => setOpen(!open)}/>
			<Drawer anchor={'right'} open={open} onClose={() => setOpen(!open)}>
				<Box sx={{width: 200}}>
					<List>
						<ListItem button component={RouterLink} to="/" onClick={() => setOpen(!open)}>
							<ListItemIcon>
								<HomeIcon/>
							</ListItemIcon>
							<ListItemText primary="Home"/>
						</ListItem>
						<ListItem button component={RouterLink} to="/contact" onClick={() => setOpen(!open)}>
							<ListItemIcon>
								<MailIcon/>
							</ListItemIcon>
							<ListItemText primary="Contact"/>
						</ListItem>
						{!usersReducer.auth ?
							<ListItem button component={RouterLink} to="/auth" onClick={() => setOpen(!open)}>
								<ListItemIcon>
									<VpnKeyIcon/>
								</ListItemIcon>
								<ListItemText primary="Sign In"/>
							</ListItem>
							:
							<ListItem button onClick={handleSignOut}>
								<ListItemIcon>
									<VpnKeyIcon/>
								</ListItemIcon>
								<ListItemText primary="Sign Out"/>
							</ListItem>}
						{usersReducer.auth ?
							<>
								<Divider/>
								<ListItem button component={RouterLink} to="/dashboard" onClick={() => setOpen(!open)}>
									<ListItemIcon>
										<DashboardIcon/>
									</ListItemIcon>
									<ListItemText primary="Dashboard"/>
								</ListItem>
							</> : null}
					</List>
				</Box>
			</Drawer>
		</>
	)
}

export default SideNav

