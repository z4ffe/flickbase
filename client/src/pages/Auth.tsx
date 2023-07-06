import {Box, Button, TextField} from '@mui/material'
import {useFormik} from 'formik'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {PreventSignIn} from '../guards/PreventSignIn.tsx'
import {useAppDispatch, useAppSelector} from '../lib/redux/hooks.ts'
import {Loader} from '../shared/Loader.tsx'
import {registerUser, signInUser} from '../store/users/usersThunk.ts'
import {errorHelper} from '../utils/tools.ts'

const Auth = () => {
	const [register, setRegister] = useState(false)
	const usersReducer = useAppSelector(state => state.users)
	const notificationsReducer = useAppSelector(state => state.notifications)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleSubmit = (values: any) => {
		if (register) {
			dispatch(registerUser(values))
		} else {
			dispatch(signInUser(values))
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.required('Sorry, email is required')
				.email('This is not valid email'),
			password: Yup.string()
				.required('Sorry, password is required')
				.min(4, 'Sorry, password less than 4 chars'),
		}),
		onSubmit: (values) => {
			handleSubmit(values)
		},
	})


	useEffect(() => {
		if (notificationsReducer && notificationsReducer.global.success) {
			navigate('/dashboard')
		}
	}, [notificationsReducer])

	return (
		<PreventSignIn>
			<div className='auth_container'>
				<h1>Authenticate</h1>
				{usersReducer.loading ? <Loader /> :
					<Box sx={{
						'& .MuiTextField-root': {
							width: '100%', marginTop: '20px',
						},
					}} component='form' onSubmit={formik.handleSubmit}>
						<TextField label='Enter your email' variant='outlined' {...formik.getFieldProps('email')}
									  {...errorHelper(formik, 'email')}>

						</TextField>
						<TextField
							label='Enter your password'
							variant='outlined'
							type='password' {...formik.getFieldProps('password')}
							{...errorHelper(formik, 'email')}>

						</TextField>
						<div className='mt-2'>
							<Button type='submit' color='primary' variant='contained'
									  size='large'>{register ? 'Register' : 'Login'}</Button>
							<Button className='mt-3' color='secondary' variant='contained' size='small'
									  onClick={() => setRegister(!register)}>Want to {register ? 'Login' : 'Register'}?</Button>
						</div>
					</Box>}
			</div>
		</PreventSignIn>
	)

}

export default Auth
