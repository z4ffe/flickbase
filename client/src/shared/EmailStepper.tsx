import {Step, StepLabel, Stepper} from '@mui/material'
import {useFormik} from 'formik'
import {Dispatch, FC, SetStateAction, useState} from 'react'
import {useAppSelector} from '../lib/redux/hooks.ts'
import {emailChangeInitialValues, emailChangeSchema} from '../schemas/emailChangeForm.ts'
import {Loader} from './Loader.tsx'

interface Props {
	setEmailModal: Dispatch<SetStateAction<boolean>>
}

enum Steps {
	'Enter old email' = 0,
	'Enter new email' = 1,
	'Are you sure?' = 2
}

export const EmailStepper: FC<Props> = ({setEmailModal}) => {
	const usersStore = useAppSelector(state => state.users)
	const [step, setStep] = useState<Steps>(Steps['Enter old email'])

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: emailChangeInitialValues,
		validationSchema: emailChangeSchema(usersStore.data.email),
		onSubmit: (values) => console.log(values),
	})

	return (
		<div>
			{usersStore.loading ? <Loader /> :
				<Stepper activeStep={step}>
					{Object.keys(Steps).filter(el => isNaN(Number(el))).map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>}
		</div>
	)
}