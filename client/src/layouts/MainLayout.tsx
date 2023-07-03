import {FC, PropsWithChildren} from 'react';
import {Container} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const MainLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<Container className="app_container mb-5">
			{children}
			<ToastContainer/>
		</Container>
	);
};

export default MainLayout;
