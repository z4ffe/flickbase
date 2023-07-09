import {Button, TextField} from '@mui/material'
import {useFormik} from 'formik'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks.ts'
import {updateUserProfile} from '../../store/users/usersThunk.ts'
import {errorHelper} from '../../utils/formikError.ts'

export const ProfileEdit = () => {
	const {firstname, lastname, age} = useAppSelector(state => state.users.data)
	const dispatch = useAppDispatch()

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {firstname, lastname, age},
		onSubmit: (values) => {
			dispatch(updateUserProfile(values))
		},
	})

	return (
		<>
			<form className='mt-3 article_form' style={{maxWidth: '250px'}} onSubmit={formik.handleSubmit}>
				<div className='form-group'>
					<TextField className='w-100'
								  label='Enter your firstname'
								  variant='outlined'
								  {...formik.getFieldProps('firstname')}
								  {...errorHelper(formik, 'firstname')} />
					<TextField className='w-100 mt-3'
								  label='Enter your lastname'
								  variant='outlined'
								  {...formik.getFieldProps('lastname')}
								  {...errorHelper(formik, 'lastname')} />
					<TextField className='w-100 mt-3'
								  label='Enter your first age'
								  variant='outlined'
								  {...formik.getFieldProps('age')}
								  {...errorHelper(formik, 'age')} />
				</div>
				<Button className='mt-3' variant='contained' color='primary' type='submit'>Edit profile</Button>
			</form>
		</>
	)
}