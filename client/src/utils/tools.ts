import {toast} from 'react-toastify'

export const errorHelper = (formik: any, values: any) => (
	{
		error: !!(formik.errors[values] && formik.touched[values]),
		helperText: (formik.errors[values] && formik.touched[values]) ? formik.errors[values] : null
	}
)

export const showToast = (type: any, message: any) => {
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
