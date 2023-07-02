import {useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'

export const AuthGuard = ({children}) => {
	const usersReducer = useSelector(state => state.users)
	const location = useLocation()

	if (!usersReducer.auth) {
		return <Navigate to="/auth" state={{from: location}} replace/>
	}

	return children
}