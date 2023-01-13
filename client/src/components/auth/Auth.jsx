import {Box, Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup'
import {registerUser} from '../../store/thunks/users';
import {errorHelper} from '../../utils/tools';

const Auth = () => {
   const [register, setRegister] = useState(false)
   const usersReducer = useSelector(state => state.users)
   const dispatch = useDispatch()

   const formik = useFormik({
	  initialValues: {email: '', password: ''}, validationSchema: Yup.object({
		 email: Yup.string()
			.required('Sorry, email is required')
			.email('This is not valid email'), password: Yup.string()
			.required('Sorry, password is required')
			.min(4, 'Sorry, password less than 4 chars')
	  }), onSubmit: (values) => handleSubmit(values)
   })

   const handleSubmit = (values) => {
	  if (register) dispatch(registerUser(values))
	  else console.log('sign in', values)
   };

   return (<div className="auth_container">
	  <h1>Authenticate</h1>
	  <Box sx={{
		 '& .MuiTextField-root': {
			width: '100%', marginTop: '20px'
		 }
	  }} component="form" onSubmit={formik.handleSubmit}>
		 <TextField name="email"
					label="Enter your email"
					variant="outlined" {...formik.getFieldProps('email')}
					{...errorHelper(formik, 'email')}>

		 </TextField>
		 <TextField name="password"
					label="Enter your password"
					variant="outlined"
					type="password" {...formik.getFieldProps('password')}
					{...errorHelper(formik, 'email')}>

		 </TextField>
		 <div className="mt-2">
			<Button type="submit" color="primary" variant="contained"
					size="large">{register ? 'Register' : 'Login'}</Button>
			<Button className="mt-3" color="secondary" variant="contained" size="small"
					onClick={() => setRegister(!register)}>Want to {register ? 'Login' : 'Register'}?</Button>
		 </div>
	  </Box>
   </div>);
};

export default Auth;
