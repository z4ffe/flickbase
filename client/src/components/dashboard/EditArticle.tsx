import AddIcon from '@mui/icons-material/Add'
import {Button, Chip, FormControl, FormHelperText, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, TextField} from '@mui/material'
import Divider from '@mui/material/Divider'
import {FieldArray, FormikProvider, useFormik} from 'formik'
import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useAppDispatch} from '../../lib/redux/hooks.ts'
import {articlesInitialValues, articlesValidationSchema} from '../../schemas/articlesForm.tsx'
import {DashboardTitle} from '../../shared/DashboardTitle.tsx'
import {Loader} from '../../shared/Loader.tsx'
import {addArticle, getAdminArticle} from '../../store/articles/articlesThunk.ts'
import {errorHelper} from '../../utils/tools.ts'
import {TextEditor} from './TextEditor.tsx'

export const EditArticle = () => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)
	const [formData, setFormData] = useState(articlesInitialValues)
	const [editorData, setEditorData] = useState(null)
	const actorsRef = useRef<HTMLInputElement>(null)
	const [editorBlur, setEditorBlur] = useState(false)
	const navigate = useNavigate()
	const params = useParams()

	const fetchAdminArticle = async () => {
		if (params.id) {
			const data = await dispatch(getAdminArticle(params.id)).unwrap()
			setFormData(data)
			setEditorData(data.content)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchAdminArticle()
	}, [])

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: formData,
		validationSchema: articlesValidationSchema,
		onSubmit: async (values) => {
			try {
				await dispatch(addArticle(values)).unwrap()
				navigate('/dashboard/articles')
			} catch (error) {
				console.error(error)
			}
		},
	})

	const handleEditorState = (state: string) => {
		formik.setFieldValue('content', state, true)
	}

	return (
		<>
			<DashboardTitle text='Edit article' />
			{loading ? <Loader /> :
				<form className='mt-3 article_form' onSubmit={formik.handleSubmit}>
					<div className='form-group'>
						<TextField
							className='w-100'
							label='Enter a title'
							variant='outlined'
							{...formik.getFieldProps('title')}
							{...errorHelper(formik, 'title')} />
					</div>
					<div className='form-group'>
						<TextEditor handleEditorState={handleEditorState} setEditorBlur={setEditorBlur}
										onError={formik.errors.content} editorBlur={editorBlur} editorData={editorData} />
						{formik.errors.content || (formik.errors.content && editorBlur) ?
							<FormHelperText error>{formik.errors.content}</FormHelperText> : null
						}
					</div>
					<div className='form-group'>
						<TextField
							className='w-100'
							label='Enter a excerpt'
							variant='outlined'
							multiline
							rows='4'
							{...formik.getFieldProps('excerpt')}
							{...errorHelper(formik, 'excerpt')} />
					</div>
					<Divider className='my-3' />
					<div className='form-group'>
						<TextField
							className='w-100'
							label='Enter a score'
							variant='outlined'
							{...formik.getFieldProps('score')}
							{...errorHelper(formik, 'score')} />
					</div>
					<div className='form-group'>
						<FormikProvider value={formik}>
							<FieldArray name='actors' render={arrayHelpers => (
								<div>
									<Paper className='actors_form'>
										<InputBase name='actors' inputRef={actorsRef}
													  className='input' placeholder='Add actor name' />
										<IconButton onClick={() => {
											if (actorsRef.current && actorsRef.current.value !== '') {
												arrayHelpers.push(actorsRef.current.value)
												actorsRef.current.value = ''
											}
										}}>
											<AddIcon />
										</IconButton>
									</Paper>
									<div className='chip_container'>
										{formik.values.actors.map((actor, idx) => (
											<div key={idx}>
												<Chip label={`${actor}`} color='primary'
														onDelete={() => arrayHelpers.remove(idx)} />
											</div>
										))}
									</div>
									{!!(formik.errors.actors && formik.touched.actors) ?
										<FormHelperText error>{formik.errors.actors.toString()}</FormHelperText> // TODO: fix TS error
										: null}
								</div>
							)}></FieldArray>
						</FormikProvider>
					</div>
					<div className='form-group'>
						<TextField
							className='w-100'
							label='Enter a director'
							variant='outlined'
							{...formik.getFieldProps('director')}
							{...errorHelper(formik, 'director')} />
					</div>
					<Divider className='my-3' />
					<FormControl fullWidth>
						<InputLabel>Select a status</InputLabel>
						<Select
							label='Select a status'
							{...formik.getFieldProps('status')}
							error={!!(formik.errors.status && formik.touched.status)}>
							<MenuItem value='draft'>Draft</MenuItem>
							<MenuItem value='public'>Public</MenuItem>
						</Select>
						{!!(formik.errors.status && formik.touched.status) ?
							<FormHelperText error>{formik.errors.status}</FormHelperText>
							: null}
					</FormControl>
					<Divider className='my-3' />
					{loading ? <Loader /> :
						<Button variant='contained' color='primary' type='submit'>Edit article</Button>}
				</form>}
		</>
	)
}