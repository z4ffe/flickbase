import {CircularProgress} from '@mui/material';

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
