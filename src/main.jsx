import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import Exercise from './Exercise'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Home /> */}
    <Exercise/>
  </React.StrictMode>,
)
