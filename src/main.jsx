import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DynamicForm from './DynamicForm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DynamicForm />
  </React.StrictMode>,
)
