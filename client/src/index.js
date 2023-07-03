import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import './assets/styles/main.css'
import Router from './routes/Router'
import {store} from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Router/>
	</Provider>
)
