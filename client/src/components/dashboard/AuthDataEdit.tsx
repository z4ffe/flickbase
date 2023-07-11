import EditIcon from '@mui/icons-material/Edit'
import {Grid, TextField} from '@mui/material'
import Divider from '@mui/material/Divider'
import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useAppSelector} from '../../lib/redux/hooks.ts'
import {EmailStepper} from '../../shared/EmailStepper.tsx'

export const AuthDataEdit = () => {
	const usersStore = useAppSelector(state => state.users)
	const [emailModal, setEmailModal] = useState(true)

	return (
		<>
			<div className='mb-3 auth_grid'>
				<Grid container spacing={1} alignItems='flex-end'>
					<Grid item>
						<TextField value={usersStore.data.email} disabled variant='standard' />
					</Grid>
					<Grid item>
						<EditIcon color='primary' onClick={() => setEmailModal(true)} />
					</Grid>
				</Grid>
				{/*  TODO: password change */}
				<Grid className='mt-3' container spacing={1} alignItems='flex-end'>
					<Grid item>
						<TextField value='*********' disabled variant='standard' />
					</Grid>
					<Grid item>
						<EditIcon color='primary' />
					</Grid>
				</Grid>
			</div>
			<Divider />
			<Modal size='lg' centered show={emailModal} onHide={() => setEmailModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Update your email</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EmailStepper setEmailModal={setEmailModal} />
				</Modal.Body>
			</Modal>
		</>
	)
}