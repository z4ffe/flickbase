import {useState} from 'react'
import {Button, Modal, Pagination, Table} from 'react-bootstrap'
import {useAppDispatch, useAppSelector} from '../../lib/redux/hooks.ts'
import {Loader} from '../../shared/Loader.tsx'
import {deleteArticleById, getPaginatedArticles} from '../../store/articles/articlesThunk.ts'
import {ArticleDashboardElement} from './ArticleDashboardElement.tsx'

export const Paginate = () => {
	const {loading, dashboardArticles} = useAppSelector(state => state.articles)
	const dispatch = useAppDispatch()
	const [deleteModal, setDeleteModal] = useState(false)
	const [articleIdForDelete, setArticleIdForDelete] = useState<string>('')

	const goToPage = (page: number | null) => {
		if (!page) {
			return
		}
		dispatch(getPaginatedArticles({page}))
	}

	const handleDeleteModal = (id: string) => {
		if (!id) {
			return setDeleteModal(false)
		}
		setDeleteModal(true)
		setArticleIdForDelete(id)
	}


	const handleDelete = async () => {
		if (articleIdForDelete) {
			await dispatch(deleteArticleById(articleIdForDelete))
			setDeleteModal(false)
			setArticleIdForDelete('')
		}
	}

	return (
		<>
			{!loading && dashboardArticles?.docs.length ?
				<>
					<Table striped bordered hover>
						<thead>
						<tr>
							<th>Created</th>
							<th>Title</th>
							<th>Score</th>
						</tr>
						</thead>
						<tbody>
						{dashboardArticles.docs.map(article => (
							<ArticleDashboardElement key={article._id} article={article}
															 handleDeleteModal={handleDeleteModal} />))}
						</tbody>
					</Table>
					<Pagination>
						{dashboardArticles.prevPage ?
							<>
								<Pagination.Prev onClick={() => goToPage(dashboardArticles.prevPage)} />
								<Pagination.Item onClick={() => goToPage(dashboardArticles.prevPage)}>
									{dashboardArticles.prevPage}
								</Pagination.Item>
							</> : null}
						<Pagination.Item active>
							{dashboardArticles.page}
						</Pagination.Item>
						{dashboardArticles.hasNextPage ?
							<>
								<Pagination.Item onClick={() => goToPage(dashboardArticles.nextPage)}>
									{dashboardArticles.nextPage}
								</Pagination.Item>
								<Pagination.Next onClick={() => goToPage(dashboardArticles.nextPage)} />
							</> : null}
					</Pagination>
				</>
				: <Loader />}
			<Modal show={deleteModal}>
				<Modal.Header>
					<Modal.Title>Are you really sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Modal.Title>You can't cancel this action</Modal.Title>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setDeleteModal(false)}>Cancel</Button>
					<Button variant='danger' onClick={handleDelete}>Delete</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}