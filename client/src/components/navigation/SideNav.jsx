import React from 'react';
import {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DehazeIcon from '@mui/icons-material/Dehaze';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SideNav = () => {
   const [state, setState] = useState(false)

   return (
	  <>
		 <DehazeIcon className="drawer_btn" onClick={() => setState(!state)}/>
		 <Drawer anchor={'right'} open={state} onClose={() => setState(!state)}>
			<Box sx={{width: 200}}>
			   <List>
				  <ListItem button component={RouterLink} to="/" onClick={() => setState(!state)}>
					 <ListItemIcon>
						<HomeIcon/>
					 </ListItemIcon>
					 <ListItemText primary="Home"/>
				  </ListItem>
				  <ListItem button component={RouterLink} to="/contact" onClick={() => setState(!state)}>
					 <ListItemIcon>
						<MailIcon/>
					 </ListItemIcon>
					 <ListItemText primary="Contact"/>
				  </ListItem>
				  <ListItem button component={RouterLink} to="/auth" onClick={() => setState(!state)}>
					 <ListItemIcon>
						<VpnKeyIcon/>
					 </ListItemIcon>
					 <ListItemText primary="Sign in"/>
				  </ListItem>
				  <ListItem button onClick={() => setState(!state)}>
					 <ListItemIcon>
						<VpnKeyIcon/>
					 </ListItemIcon>
					 <ListItemText primary="Sign out"/>
				  </ListItem>
				  <>
					 <Divider/>
					 <ListItem button component={RouterLink} to="/dashboard" onClick={() => setState(!state)}>
						<ListItemIcon>
						   <DashboardIcon/>
						</ListItemIcon>
						<ListItemText primary="Dashboard"/>
					 </ListItem>
				  </>
			   </List>
			</Box>
		 </Drawer>
	  </>
   );
};

export default SideNav;

