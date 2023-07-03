import {Navigate, useLocation} from 'react-router-dom'

export const PreventSignIn = ({auth, children}) => {
	const location = useLocation()

	if (auth) {
		return <Navigate to="/auth" state={{from: location}} replace/>
	}

	return children
}