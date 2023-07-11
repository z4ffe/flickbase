import Divider from '@mui/material/Divider'
import {DashboardTitle} from '../../shared/DashboardTitle.tsx'
import {AuthDataEdit} from './AuthDataEdit.tsx'
import {ProfileEdit} from './ProfileEdit.tsx'

export const ProfilePanel = () => {
	return (
		<>
			<DashboardTitle text='Profile'></DashboardTitle>
			<AuthDataEdit />
			<Divider className='my-2' />
			<ProfileEdit />
		</>
	)
}