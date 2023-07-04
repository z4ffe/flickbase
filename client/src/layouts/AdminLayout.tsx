import {List, ListItemButton} from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import {FC, PropsWithChildren} from 'react'
import {Link} from 'react-router-dom'
import {useAppSelector} from '../lib/redux/hooks.ts'

export const AdminLayout: FC<PropsWithChildren> = ({children}) => {
	const role = useAppSelector(state => state.users.data.role)

	return (<div className='row adminLayout'>
		<nav className='col-md-2 d-none d-md-block sidebar'>
			<List>
				<ListItemButton component={Link} to='/dashboard/profile'>
					<ListItemText primary='Profile' />
				</ListItemButton>
				{role === 'admin' ?
					<ListItemButton component={Link} to='/dashboard/articles'>
						<ListItemText primary='Articles' />
					</ListItemButton>
					: null}
			</List>
		</nav>
		<main role='main' className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
			{children}
		</main>
	</div>)
}