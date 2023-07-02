import {CircularProgress} from '@mui/material'
import {toast} from 'react-toastify'

export const errorHelper = (formik, values) => (
	{
		error: !!(formik.errors[values] && formik.touched[values]),
		helperText: (formik.errors[values] && formik.touched[values]) ? formik.errors[values] : null
	}
)

export const Loader = () => {
	return (
		<div className="root_loader">
			<CircularProgress/>
		</div>
	)
}

export const showToast = (type, message) => {
	switch (type) {
		case('SUCCESS'):
			toast.success(message, {
				position: 'top-right'
			})
			break
		case('WARN'):
			toast.warn(message, {
				position: 'top-right'
			})
			break
		case('ERROR'):
			toast.error(message, {
				position: 'top-right'
			})
			break
		default:
			return false
	}
}
