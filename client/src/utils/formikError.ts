import {FormikValues} from 'formik'

export const errorHelper = (formik: FormikValues, values: string): {error: boolean, helperText: string | null} => (
	{
		error: !!(formik.errors[values] && formik.touched[values]),
		helperText: (formik.errors[values] && formik.touched[values]) ? formik.errors[values] : null,
	}
)