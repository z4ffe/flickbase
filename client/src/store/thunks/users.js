import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('users/registerUser', async ({email, password}, {dispatch}) => {
   try {
	  const response = axios.post(`${process.env.REACT_APP_API}/auth/register`, {
		 email: email,
		 password: password
	  })
	  return response
   } catch (error) {
	  throw error
   }
})
