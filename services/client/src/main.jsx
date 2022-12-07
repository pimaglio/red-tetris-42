import React from 'react'
import ReactDOM from 'react-dom/client'
// components
import App from './App'
// redux
import {store} from './redux/store'
import { Provider } from 'react-redux'
// assets
import './index.css'
import 'virtual:windi.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
