import {FC} from 'react'
import Moment from 'react-moment'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '../../lib/redux/hooks.ts'
import {updateArticleStatusById} from '../../store/articles/articlesThunk.ts'
import {notificationsActions} from '../../store/notifications/notificationsSlice.ts'
import {IArticle} from '../../types/interfaces/articles.ts'

interface Props {
	article: IArticle
	handleDeleteModal: (id: string) => void
}

export const ArticleDashboardElement: FC<Props> = ({article, handleDeleteModal}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const buttonStatusStyle = article.status === 'draft' ? 'status_btn-draft' : 'status_btn-public'

	const handleEdit = (id: string) => {
		navigate(`/dashboard/articles/edit/${id}`)
	}

	const handleStatus = async (id: string, status: string) => {
		switch (status) {
			case('draft'):
				await dispatch(updateArticleStatusById({id, status: 'public'}))
				break
			case('public'):
				await dispatch(updateArticleStatusById({id, status: 'draft'}))
				break
			default:
				notificationsActions.errorGlobal('Something went wrong')
				break
		}
	}

	return (
		<tr key={article._id}>
			<td>{<Moment to={article.date}></Moment>}</td>
			<td>{article.title}</td>
			<td>{article.score}</td>
			<td className={`action_btn ${buttonStatusStyle}`}
				 onClick={() => handleStatus(article._id, article.status)}>{article.status}</td>
			<td className='action_btn edit_btn' onClick={() => handleEdit(article._id)}>Edit</td>
			<td className='action_btn remove_btn' onClick={() => handleDeleteModal(article._id)}>Remove</td>
		</tr>
	)
}