import {FC, PropsWithChildren} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useAppSelector} from '../lib/redux/hooks.ts'

export const AuthGuard: FC<PropsWithChildren> = ({children}) => {
	const usersReducer = useAppSelector(state => state.users)
	const location = useLocation()

	if (!usersReducer.auth) {
		return <Navigate to='/auth' state={{from: location}} replace />
	}

	return children
}