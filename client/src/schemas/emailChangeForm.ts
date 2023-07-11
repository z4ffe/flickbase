import * as Yup from 'yup'

type emailChangeValues = {
	email: string
	newEmail: string
}

export const emailChangeInitialValues: emailChangeValues = {
	email: '',
	newEmail: '',
}

export const emailChangeSchema = (emailFromSlice: string | null) => Yup.object<emailChangeValues>({
	email: Yup.string()
		.email('Must be email eg: email@host.com')
		.required('Sorry the title is required')
		.test('match', 'Email not valid', (email) => email === emailFromSlice),
	newEmail: Yup.string()
		.email('Must be email eg: email@host.com')
		.required('Sorry the content is required')
		.test('match', 'Email not valid', (email) => email !== emailFromSlice),
})
