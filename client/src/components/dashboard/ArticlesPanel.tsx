import {useEffect} from 'react'
import {Button, ButtonGroup, ButtonToolbar, FormControl, InputGroup} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useAppDispatch} from '../../lib/redux/hooks.ts'
import {DashboardTitle} from '../../shared/DashboardTitle.tsx'
import {getPaginatedArticles} from '../../store/articles/articlesThunk.ts'
import {Paginate} from './Paginate.tsx'

export const ArticlesPanel = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getPaginatedArticles({}))
	}, [])

	return (
		<>
			<DashboardTitle text='Articles' />
			<div className='articles_table'>
				<ButtonToolbar className='mb-3'>
					<ButtonGroup className='me-3'>
						<LinkContainer to='/dashboard/articles/add'>
							<Button variant='secondary'>Add article</Button>
						</LinkContainer>
					</ButtonGroup>
					<form>
						<InputGroup>
							<InputGroup.Text id='btr-group'>@</InputGroup.Text>
							<FormControl type='text' placeholder='Search article...' />
						</InputGroup>
					</form>
				</ButtonToolbar>
				<Paginate />
			</div>
		</>
	)
}