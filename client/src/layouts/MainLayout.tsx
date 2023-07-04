import {FC, PropsWithChildren} from 'react'
import {Container} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useAppSelector} from '../lib/redux/hooks.ts'


const MainLayout: FC<PropsWithChildren> = ({children}) => {
	const layout = useAppSelector(state => state.site.layout)

	return (
		<Container className={`app_container mb-5 ${layout}`}>
			{children}
			<ToastContainer />
		</Container>
	)
}

export default MainLayout
