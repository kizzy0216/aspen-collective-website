
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './styles/index.scss'
import dotenv from 'dotenv' 
dotenv.config()

ReactDOM.render(<App />, document.getElementById('ute'))
serviceWorker.unregister()
