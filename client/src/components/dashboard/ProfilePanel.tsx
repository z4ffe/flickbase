import {DashboardTitle} from '../../shared/DashboardTitle.tsx'
import {ProfileEdit} from './ProfileEdit.tsx'

export const ProfilePanel = () => {
	return (
		<div>
			<DashboardTitle text='Profile'></DashboardTitle>
			<ProfileEdit />
		</div>
	)
}