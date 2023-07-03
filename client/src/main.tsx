import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import './assets/styles/main.css'
import Router from './routes/Router.tsx'
import {store} from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router/>
		</Provider>
	</React.StrictMode>,
)
